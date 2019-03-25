import React, {Component} from 'react';
import '../ImgBox.css'
import  {connect} from 'react-redux'

import {Link} from "react-router";

class QuizCard extends Component {
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }
    render() {
        return (
            <div className={`ImageBox ${this.props.imgStyle}`}
                 style={{backgroundImage:"url(" + this.props.src + ")"}}
            >
                    <span className={"mainText"} >
                        <Link  className={'linkstyle'}
                                to={`/Quiz/${this.props.id}`}
                        >
                            {this.props.text}
                            </Link>
                    </span>
            </div>
        );
    }
}

export default QuizCard;