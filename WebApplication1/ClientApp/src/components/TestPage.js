import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/WeatherForecasts";
import { Link } from 'react-router-dom';
import  './TestPage.css'

class TestPage extends Component {
    render() {
        console.log(this.props.match.params)
        return (
            <div className={"center"}>
                <div className={"Welcome"} >
                <span className={"header"} >Насколько ты хороший программист?</span>
                    <div className="pad">
                        <div className={"arrow"}>
                            <Link  to = {`/bg/QuizRender/${this.props.match.params.id}`}>nex</Link>
                        </div>
                    </div>
                    <span  className={"discripton"} >насколько ты хорош в своем деле</span>
                </div>
            </div>
        );
    }
}

export default TestPage;
