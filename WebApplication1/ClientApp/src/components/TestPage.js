import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/WeatherForecasts";
import { Link } from 'react-router-dom';
import  './TestPage.css'
import Arrow from "./Arrow";

class TestPage extends Component {
    render() {
        return (
            <div className={"TestPageBody"}>
                <div className={"Welcome"} >
                <span className={"header"} >{this.props.children}
                </span>
                    <div className="pad">
                        <div onClick={()=> this.props.next()}>
                             <Arrow
                                rotate={'right'}
                             />
                        </div>
                    </div>
                    <span  className={"discripton"} >насколько  хорош в своем деле</span>
                </div>
            </div>
        );
    }
}

export default TestPage;
