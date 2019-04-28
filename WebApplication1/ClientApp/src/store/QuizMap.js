const getQuiz = 'REQUEST_QUIZ';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = { forecasts: [], isLoading: false };

export const actionCreators = {
    requestQuiz: QuizHash => async (dispatch, getState) => {
        if (QuizHash === getState().requestQuiz.QuizHash) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        dispatch({ type: getQuiz, QuizHash });

        const url = `api/SampleData/quiz?hash=${QuizHash}`;
        const response = await fetch(url);
        const Quizes = await response.json();
        console.log(Quizes);

        dispatch({ type: receiveWeatherForecastsType, QuizHash, Quizes });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === getQuiz) {
        return {
            ...state,
            QuizHash: action.QuizHash,
            isLoading: true
        };
    }

    if (action.type === receiveWeatherForecastsType) {
        return {
            ...state,
            QuizHash: action.QuizHash,
            Quizes: action.Quizes,
            isLoading: false
        };
    }

    return state;
};