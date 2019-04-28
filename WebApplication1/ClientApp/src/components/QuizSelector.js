import React, {Component} from 'react';
import QuizCard from "./QuizCard";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/QuizMap";
import './selector.css'

var obj = {text: 'sometext', id: 1}, arr = [obj,obj,obj];
class QuizSelector extends Component {
    render() {
        console.log(arr);
        return (
            <div className={'main'} >
                <div className={'Header'} > Выберите тест </div>
                <div className={"Page"}>
                {arr.map( (k,i)=>
                    <QuizCard key={i} text={k.text}
                              id = {k.id}
                    />
                    )}
                </div>
            </div>
        );
    }
}
export default connect(
    state => state.weatherForecasts,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(QuizSelector);