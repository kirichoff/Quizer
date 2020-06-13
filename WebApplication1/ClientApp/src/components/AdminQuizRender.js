import React, {Component} from 'react';
import "./TestPage.css"
import './chebox.css'
import './AdminAgregatecss.css'
import {Link} from "react-router-dom";
import * as icons from "rambler-ui/icons/forms";
import Input from "rambler-ui/Input";
import Button from "rambler-ui/Button";
import { Textarea } from 'rambler-ui';

const ChevronLeftIcon = icons['ChevronLeftIcon'];
const ChevronRightIcon = icons['ChevronRightIcon'];
const ClearIcon = icons['ClearIcon'];
const AddIcon = icons['AddIcon'];

var obj = {
    Question: "Содержание вопроса",
    Questions: [{Text: "", right: false, Point: 0}]
}
var arr = [{...obj}]

class Ques {
    Question = "Содержание вопроса";
    Questions = [{Text: "", Right: false, Point: 0}]

    constructor() {

    }
}


class AdminQuizRender extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            anser: -1,
            QuizMap: [new Ques()],
            isend: false,
        }
        this.change = this.change.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    inc = () => {
        let counter = this.state.counter;
        let isend = false;
        if (counter + 1 === this.state.QuizMap.length) isend = true;
        if (counter + 1 <= this.state.QuizMap.length - 1) counter = counter + 1;
        this.setState({counter: counter, anser: -1, isend: isend});
    };

    dec = () => {
        let counter = 0;
        if (this.state.counter > 0) counter = this.state.counter - 1
        this.setState({counter: counter, anser: -1, isend: false});
    };

    change = (event) => {
        let buf = Object.assign(this.state.QuizMap);
        buf[this.state.counter].Questions[event.target.id].Text = event.target.value;
        this.setState({QuizMap: buf})
    }

    add = () => {
        let b = Object.assign(this.state.QuizMap);
        b[this.state.counter].Questions.push({Text: "", right: false, Point: 0});
        this.setState({QuizMap: Object.assign(b)})
    }

    addQu = () => {
        this.setState({
            counter: this.state.QuizMap.length,
            QuizMap: [...this.state.QuizMap, {
                Question: '<Вопрос>',
                Questions: [
                    {Text: "", Right: false, Point: 0}
                ]
            }]
        })
    }

    handleInputChange(event) {

        const target = event.target;
        const index = parseInt(event.target.dataset.index);
        const map = this.state.QuizMap
        try {
            map[this.state.counter].Questions[index].Right = event.target.checked;
        } catch (e) {

        }
        console.log(this.state.QuizMap)

        this.setState({QuizMap: map})
    }

    componentDidMount() {
        console.log(this.props)
        this.setState({QuizMap: this.props.QuizMap})
    }

    total = (array) => {
        array = array || this.state.QuizMap && this.state.QuizMap.length ? this.state.QuizMap : []
        let sum = 0;
        if (array.length) {
            for (let item of array) {
                sum += this.forQuestion(item.Questions)
            }
        }
        return sum;
    }

    forQuestion = (arr1) => {
        let sum = 0
        for (let i = 0; i < arr1.length; i++) {
            sum += arr1[i].Point
        }
        return sum;
    }


    deleteVariant = (count,id) => { }

    render() {
        console.log(this.props)
        return (
            <div className={'TestPageBody'}>
                <div className={"mainRend"}>
                    <div className="hs">
                        <textarea
                            className={'HeaderInput'}
                            type={'text'}
                            value={this.state.QuizMap[this.state.counter].Question}
                            onChange={(e) => {
                                let bf = this.state.QuizMap;
                                bf[this.state.counter].Question = e.target.value;
                                this.setState({QuizMap: bf})
                            }}
                        />
                    </div>
                    < div className="QuizRender">
                        {
                            (!this.state.isend) ?
                                <div className={' Header2 Header '}>
                                    <div>
                                        Выберите один или несколько вариантов ответа
                                    </div>
                                        <Button
                                            onClick={() => {
                                                if (this.total() == this.props.maxPoint) {
                                                    this.props.cl(this.state.QuizMap)
                                                    this.props.history.push('/')
                                                }
                                            }
                                            }
                                            style={{marginRight: '0%', marginTop: '1%'}}
                                            type={'outline'} size={'small'} rounded={true}>
                                            Завершить
                                        </Button>
                                </div>
                                : null
                        }
                        {
                            (!this.state.isend) ?
                                <div className={'justify_content'}>
                                    {
                                        this.state.QuizMap[this.state.counter].Questions.map((k, i) =>
                                            <div key={i + "text"} className={'sizz'}>
                                            <span>
                                            <label className={'container'}>
                                            <input
                                                className={"check"}
                                                name="isGoing"
                                                type="checkbox"
                                                data-index={i}
                                                checked={k.Right}
                                                onChange={this.handleInputChange}
                                            />
                                                <span className={'checkmark'}></span>
                                            </label>
                                                </span>
                                                <span className={'inputAdmin'}>
                                                            <Input
                                                                style={{width: '80%', display: 'inline-block'}}
                                                                type="text"
                                                                value={k.Text}
                                                                onChange={(event) => {
                                                                    let map = this.state.QuizMap;
                                                                    map[this.state.counter].Questions[i].Text = event.target.value
                                                                    this.setState({QuizMap: [...map]})
                                                                }}
                                                                placeholder="<вариант>"
                                                                id={i}
                                                                variation={'regular'}
                                                                size={'small'}

                                                            />
                                                                 <Input
                                                                     style={{width: '15%', display: 'inline-block'}}
                                                                     type="number"
                                                                     value={(k.Point)}
                                                                     onChange={(event) => {
                                                                         let map = this.state.QuizMap;
                                                                         map[this.state.counter].Questions[i].Point = Math.abs(+event.target.value)
                                                                         this.setState({QuizMap: [...map]})
                                                                     }}
                                                                     disabled={!k.Right}
                                                                     id={i}
                                                                     variation={'regular'}
                                                                     size={'small'}
                                                                 />
                                                                 <span style={{width: '5%', display: 'inline-block'}}>
                                                                     <ClearIcon
                                                                        onClick={
                                                                            ()=>{
                                                                                let ques = this.state.QuizMap[this.state.counter].Questions;
                                                                                ques.splice(i,1)
                                                                                this.state.QuizMap[this.state.counter].Questions = ques;

                                                                                this.setState({QuizMap: this.state.QuizMap})
                                                                            }
                                                                        }
                                                                     />
                                                                 </span>
                                                    </span>
                                            </div>
                                        )
                                    }
                                    <span onClick={this.add}>
                                          <AddIcon className={"PlusQues"}/>
                                            </span>
                                </div>
                                :
                                <div>
                                    Good Work
                                    <button onClick={
                                        () => this.props.cl(this.state.QuizMap)
                                    }>Send</button>
                                </div>
                        }
                        {(!this.state.isend) ? <div>
                                <div style={{marginTop: '12%', width: '100%', height: '50%'}}
                                     className={'Header AlignText'}>
                                    <ChevronLeftIcon style={{marginRight: '10%'}} onClick={this.dec} className={'strelka'}
                                                     color={'#0d0d0d'}
                                                     size={'20%'}/>
                                    <span> {this.state.counter + 1}/{this.state.QuizMap.length} </span>
                                    {
                                        (!(this.state.counter + 1 === this.state.QuizMap.length)) ?
                                            <ChevronRightIcon
                                                style={{marginLeft: '10%'}}
                                                onClick={this.inc}
                                                className={'strelka'} color={'#0d0d0d'} size={'20%'}
                                            />
                                            :
                                            <AddIcon
                                                style={{marginLeft: '10%'}}
                                                onClick={this.addQu}
                                                className={'strelka'}
                                                color={'#0d0d0d'}
                                                size={'20%'}
                                            />
                                    }
                                </div>
                            </div>
                            :
                            null
                        }
                        {
                            <span style={{color: this.total() == this.props.maxPoint ? 'green' : 'red'}}>
                                           Всего набрано {this.total() + ' баллов из ' + this.props.maxPoint} 
                            </span>
                        }
                    </div>
                </div>
            </div>

        );

        function check(map) {


        }
    }
}

export default AdminQuizRender;