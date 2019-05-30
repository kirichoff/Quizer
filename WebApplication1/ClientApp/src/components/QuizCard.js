import React, {Component} from 'react';
import  {connect} from 'react-redux'
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom'
import './quizcard.css'
import  '../immge.jpg'
import Tooltip from 'rambler-ui/Tooltip'
import * as icons from 'rambler-ui/icons/services'
import * as Formicons from 'rambler-ui/icons/forms'

const IconMet = icons['RamblerFinanceIcon'];
const IconRem = Formicons['RemoveIcon'];

class QuizCard extends Component {
    constructor(){
        super();
    }

    cl(){
        console.log('cl')
    }
    render() {
        console.log('qweeeeeeeee')
        console.log(icons)

        return (
            <div className={'Contain'} >
            <Link
                className={'Contain'}
               to={`/bg/Test/${this.props.id}`}
                >
                        <img src={'../immge.jpg'} className={'imag'} />
                           <div>{this.props.text}</div>
                            <p className={'desc'} >{this.props.desc}</p>

        </Link>

                <div style={{marginLeft:'30%',marginTop: '20%' ,display: 'flex', alignItems:'center' }} >
                    <IconMet  onClick={this.cl} className={'icon'}  />
                    <IconRem className={'icon'} style={{marginLeft: '20%'}} />
                </div>
            </div>
        );
    }
}

export default QuizCard;