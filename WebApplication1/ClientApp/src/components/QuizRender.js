import React, {Component} from 'react';
import "./TestPage.css"
import {Link} from "react-router-dom";
import * as icons from 'rambler-ui/icons/forms'
import Button from "rambler-ui/Button";

const st = {backgroundColor: '#96ff63'};
const ChevronLeftIcon = icons['ChevronLeftIcon'];
const ChevronRightIcon = icons['ChevronRightIcon'];

class QuizRender extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            isend: false,
            request: false,
            is_answer: null,
            Answers: []
        }
        this.change = this.change.bind(this)
    }

    componentWillMount = () => {
    };


    inc = () => {
        let counter = this.state.counter;
        let isend = false;
        if (counter + 1 === this.props.QuizMap.length) isend = true;
        if (counter + 1 <= this.props.QuizMap.length - 1) counter = counter + 1;
        this.setState({counter: counter, anser: -1, isend: isend, is_answer: null});
    };
    dec = () => {
        let counter = 0;
        if (this.state.counter > 0) counter = this.state.counter - 1
        if (this.state.isend) counter = this.state.counter
        this.setState({counter: counter, anser: -1, isend: false});
    };

    send() {
        console.log('sending...')
    }

    change(e) {
        let index = parseInt(e.target.dataset.index);
        let answers = this.state.Answers;
            if (answers[this.state.counter]) {
                let count1 = this.answersCount(answers[this.state.counter].Answer);
                let count2 = this.rightAnswers(this.props.QuizMap[this.state.counter].Questions);
                if(count1 < count2 ) {
                    answers[this.state.counter].Answer[index] = true;
                }
            } else {
                answers.push(
                    {
                        TestItem: this.props.QuizMap[this.state.counter],
                        Answer: new Array(this.props.QuizMap[this.state.counter].Questions.length).fill(false, 0)
                    }
                )
                answers[this.state.counter].Answer[index] = true;
            }
            console.log(this.state.Answers)
            this.setState({Answers: [...answers]})
    }

    rightAnswers(question){
        let count = 0;
        for (let item of question){
            if(item.Right){
                count++
            }
        }
        return count;
    }

    answersCount(question){
        let count = 0;
        for (let item of question){
            if(item){
                count++
            }
        }
        return count;
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div className={"mainRend"}>
                    <div className="hs">
                        {!(this.state.isend) ? this.props.QuizMap[this.state.counter].Question : 'Хорошая работа'}
                    </div>
                    < div className="QuizRender">
                        {
                            (!this.state.isend) ?
                                <div className={' Header2 Header '}>
                                    <div className={'MakeDes'}>Выберите Вариант ответа</div>
                                </div>
                                :
                                <div className={' Header2 Header '}>
                                    {/*<div className={'MakeDes'}>Результат</div>*/}
                                </div>
                        }
                        <div> колличество правильных вариантов {this.rightAnswers(this.props.QuizMap[this.state.counter].Questions)}</div>
                        {
                            (!this.state.isend) ?
                                <div className={'justify_content'}>
                                    {
                                        this.props.QuizMap[this.state.counter].Questions.map((k, i) => {

                                            console.log( 'ques',this.state.Answers,i)
                                        let answer = [];
                                            let answers = this.state.Answers[this.state.counter];
                                        if(this.state.Answers.length && answers){
                                            if(answers.Answer && answers.Answer.length){
                                                answer = answers.Answer
                                            }
                                        }
                                        console.log(answer)
                                         return(   <div className={'Pointstyle'}
                                                 style={{
                                                     background: answer[i] ? "#96ff63" : ""
                                                 }}
                                                 data-index={i}
                                                 key={i}
                                                 onClick={this.change}>
                                                {k.Text}
                                            </div>)
                                        })
                                    }
                                    {/*{isRight(this.state.answerssMap, this.state.counter, this.props.QuizMap[this.state.counter].Right)}*/}
                                </div>
                                :
                                <div>
                                    <div style={{color: '#212121'}} className="hs">Спасибо!</div>
                                </div>
                        }
                        {(!this.state.isend) ?
                            null
                            :
                            <div style={{marginTop: '30%', height: '20%'}}>
                                <Button
                                    onClick={() => {
                                        this.props.sendResult(this.state.Answers)
                                    }}
                                    size={'small'}
                                    rounded={true}>
                                    к остальным тестам
                                </Button>
                            </div>
                        }
                        {(!this.state.isend) ?
                            <div style={{marginTop: '12%', width: '100%', height: '50%'}}
                                 className={'Header AlignText'}>
                                <ChevronLeftIcon style={{marginRight: '10%'}} onClick={this.dec} className={'strelka'}
                                                 color={'#0022CB'}
                                                 size={'20%'}/>
                                <span> {this.state.counter}/{this.props.QuizMap.length} </span>
                                <ChevronRightIcon
                                    style={{marginLeft: '10%'}}
                                    onClick={this.inc}
                                    className={'strelka'} color={'#0022CB'} size={'20%'}/>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>

        );

        function isRight(ar, counter, right) {
            if (ar[counter].answer === right) return (<div className={'answer'}>Верно</div>);
            if (ar[counter].answer === -1) return (<div className={'answer'}>неверно</div>)
            if (ar[counter] === -2) return (null)
        }

    }
}

export default QuizRender;