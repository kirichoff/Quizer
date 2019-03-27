import React, {Component} from 'react';
import '../ImgBox.css'
import  {connect} from 'react-redux'
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom'
class QuizCard extends Component {
    constructor(){
        super();
    }

    func(){
        history.push(`/Quiz/${this.props.id}`);
    }

    render() {
        return (
            <div className={`ImageBox`}>
                    <span className={"mainText"} >
                        <Link  className={'linkstyle'}
                                to={`/Quiz/${this.props.id}`}
                        >
                            {this.props.text}
                            </Link>

                   <div onClick={this.func} >Click</div>
                    </span>
            </div>
        );
    }
}

export default QuizCard;