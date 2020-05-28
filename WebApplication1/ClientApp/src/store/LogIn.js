const Getlogin = 'LOGIN';
const receiveWeatherForecastsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = { forecasts: [], isLoading: false };

export const actionCreators = {
        requestLogin: (name,pass) => async (dispatch, getState) => {
        if (startDateIndex === getState().weatherForecasts.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestWeatherForecastsType,name,pass });

        const url = `api/SampleData/Login?name=${name}?pas=${pass}`;
        const response = await fetch(url);
        const forecasts = await response.json();

        if (forecasts) {
            dispatch({type: Getlogin, startDateIndex, forecasts});
        }
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === Getlogin) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            isLoading: true
        };
    }

    if (action.type === receiveWeatherForecastsType) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            forecasts: action.forecasts,
            isLoading: false
        };
    }

    return state;
};
