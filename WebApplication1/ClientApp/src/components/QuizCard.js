import React, {Component} from 'react';
import '../ImgBox.css'
import  {connect} from 'react-redux'
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import './card.css'
class QuizCard extends Component {
    constructor(){
        super();
    }

    render() {
        return (

            <div className={'some'}>
                <Link  className={'linkstyle'}
                       to={`/bg/Test/${this.props.id}`}
                        >
                <div className={`ImageBox`}>
                        <span className={"mainText"} >
                           <div>{this.props.text}</div>
                       </span>
                </div>
            </Link>
            </div>
        );
    }
}

export default QuizCard;