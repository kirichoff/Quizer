import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/WeatherForecasts";
import { Link } from 'react-router-dom';
import  './TestPage.css'
import './Infoform.css'
import Arrow from "./Arrow";

class TestPage extends Component {
    render() {
        return (
            <div className={"TestPageBody"}>
                <div className={"Wel2"} >
                <div className={"hpos header"} >
                    {this.props.children}
                </div>
                        <div className={'pos2'} onClick={()=> this.props.next()}>
                             <Arrow
                                rotate={'right'}
                             />
                    </div>
                </div>
            </div>
        );
    }
}

export default TestPage;
