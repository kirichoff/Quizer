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
        return (
            <div className={'Contain'} >
            <Link
                className={'textDecor'}
               to={`/${this.props.to}${this.props.id}`}
                >
                        <img src={this.props.img} className={'imag'} />
                           <div>{this.props.text}</div>
                            <p className={'desc'} >{this.props.desc}</p>

        </Link>
                {(this.props.isLog) ?
                    <div style={{marginLeft: '30%', marginTop: '10%', display: 'flex', alignItems: 'center'}}>
                        <Link to={`/Stat/${this.props.id}`}><IconMet onClick={this.cl} className={'icon'}/></Link>
                        < IconRem onClick={() => this.props.Remove(this.props.id)  } className={'icon'}
                                  style={{marginLeft: '20%'}}/>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

export default QuizCard;