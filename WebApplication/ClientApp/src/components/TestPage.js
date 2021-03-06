import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/WeatherForecasts";
import { Link } from 'react-router-dom';
import  './TestPage.css'
import './Infoform.css'
import Arrow from "./Arrow";
import Button from "rambler-ui/Button";
import {Toggle, ToggleOption} from 'rambler-ui/Toggle'

class TestPage extends Component {
    render() {
        return (
            <div className={"TestPageBody"}>
                <div className={"Wel2"} >
                <div className={"hpos header"} >
                    {this.props.children}
                    </div>
                    {this.props.payload}
                        <div style={ {  marginBottom: "5%",}}>
                            <Button container={<Link to={'/bg2/TestsList'}/>}  type={'outline'} size={'small'} rounded={true}>
                                Назад
                            </Button>
                            <Button onClick={()=> this.props.next()}  style={{float:'right' }} size={'small'}  rounded={true}>
                               Далее
                            </Button>
                    </div>
                </div>

            </div>
        );
    }
}

export default TestPage;
