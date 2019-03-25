import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/WeatherForecasts";
import { Link } from 'react-router-dom';
import  './TestPage.css'

class TestPage extends Component {
    render() {
        return (
            <div>
            <div className={"TestPageBody"} >
                <div className={"Welcome"} >
                <span className={"header"} >Насколько ты хороший программист?</span>
                    <span className={"discripton"} >насколько ты хорош в своем деле</span>
                </div>
            </div>
            <div className="pad">
                <div className={"triangle"}></div>
            </div>
            </div>
        );
    }
}

export default connect(
    state => state.weatherForecasts,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(TestPage);
