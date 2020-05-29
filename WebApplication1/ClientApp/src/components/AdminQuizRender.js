import React, {Component} from 'react';
import "./TestPage.css"
import './chebox.css'
import './AdminAgregatecss.css'
import {Link} from "react-router-dom";
import * as icons from "rambler-ui/icons/forms";
import Input from "rambler-ui/Input";
import Button from "rambler-ui/Button";

const ChevronLeftIcon = icons['ChevronLeftIcon'];
const ChevronRightIcon = icons['ChevronRightIcon'];
const AddIcon = icons['AddIcon'];

var obj = {
    Question: "Q",
    Questions: [{Text: "", right: false, Point: 0}]
}
var arr = [obj]


class AdminQuizRender extends Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
            anser: -1,
            QuizMap: Object.assign(arr),
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
                Question: 'вопрос',
                Questions: [
                    {Text: "", right: false, Point: 0}
                ]
            }]
        })
    }

    handleInputChange(event) {

        const target = event.target;
        const index = parseInt(event.target.dataset.index);
        const map = this.state.QuizMap
        try {
            map[this.state.counter].Questions[index].right = event.target.checked;
        }
        catch (e) {

        }

        console.log(this.state.QuizMap)

        this.setState({QuizMap: map})

    }

    render() {
        return (
            <div className={'TestPageBody'}>
                <div className={"mainRend"}>
                    <div className="hs">
                        <input
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
                                        Выберите один из Вариантов ответа
                                    </div>
                                    <Link to={'/'}>
                                        <Button
                                            onClick={() => this.props.cl(this.state.QuizMap)}
                                            style={{marginRight: '0%', marginTop: '1%'}}
                                            type={'outline'} size={'small'} rounded={true}>
                                            завершить
                                        </Button>
                                    </Link>
                                </div>
                                : null
                        }
                        {
                            (!this.state.isend) ?
                                <div className={'justify_content'}>
                                    {
                                        this.state.QuizMap[this.state.counter].Questions.map((k, i) =>
                                                <div key={i+"text"}  className={'sizz'}>
                                            <span>
                                            <label className={'container'}>
                                            <input
                                                className={"check"}
                                                name="isGoing"
                                                type="checkbox"
                                                data-index={i}
                                                checked={k.right}
                                                onChange={this.handleInputChange}
                                            />
                                                <span className={'checkmark'}></span>
                                            </label>
                                                </span>
                                                    <span className={'inputAdmin'}>
                                                            <Input
                                                                style={{width:'85%',display: 'inline-block'}}
                                                                type="text"
                                                                value={k.Text}
                                                                onChange={(event)=> {
                                                                    let map = this.state.QuizMap;
                                                                    map[this.state.counter].Questions[i].Text = event.target.value
                                                                    this.setState({QuizMap:[ ...map]})
                                                                }}
                                                                placeholder="вопросс"
                                                                id={i}
                                                                variation={'regular'}
                                                                size={'small'}

                                                            />
                                                                 <Input
                                                                     style={{width:'15%',display: 'inline-block'}}
                                                                     type="number"
                                                                     value={k.Point}
                                                                     onChange={(event)=> {
                                                                             let map = this.state.QuizMap;
                                                                             map[this.state.counter].Questions[i].Point= +event.target.value
                                                                             this.setState({QuizMap:[ ...map]})
                                                                     }}
                                                                     id={i}
                                                                     variation={'regular'}
                                                                     size={'small'}
                                                                 />
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
                                                     color={'#0022CB'}
                                                     size={'20%'}/>
                                    <span> {this.state.counter + 1}/{this.state.QuizMap.length} </span>
                                    {
                                        (!(this.state.counter + 1 === this.state.QuizMap.length)) ?
                                            <ChevronRightIcon
                                                style={{marginLeft: '10%'}}
                                                onClick={this.inc}
                                                className={'strelka'} color={'#0022CB'} size={'20%'}
                                            />
                                            :
                                            <AddIcon
                                                style={{marginLeft: '10%'}}
                                                onClick={this.addQu}
                                                className={'strelka'}
                                                color={'#0022CB'}
                                                size={'20%'}
                                            />
                                    }
                                </div>
                            </div>
                            :
                            null
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