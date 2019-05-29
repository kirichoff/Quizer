import React, {Component} from 'react';
import  {connect} from 'react-redux'
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import './quizcard.css'
import  '../immge.jpg'

class QuizCard extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <Link
                className={'Contain'}
               to={`/bg/Test/${this.props.id}`}
                >
                        <img src={'../immge.jpg'} className={'imag'} />
                           <div>{this.props.text}</div>
                            <p className={'desc'} >{this.props.desc}</p>
        </Link>
        );
    }
}

export default QuizCard;