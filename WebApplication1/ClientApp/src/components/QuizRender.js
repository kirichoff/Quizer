import React, {Component} from 'react';
import TestPage from "./TestPage";
import "./TestPage.css"
import EndOfQuestion from "./EndOfQuestion";
import {Link} from "react-router-dom";
import Checkbox from 'rambler-ui/Checkbox'
import * as icons from 'rambler-ui/icons/forms'
import Button from "rambler-ui/Button";
const tests = {
    text:"hallow"
}
var obj ={
    header: "qwe",
    right: 1,
    tests: [tests,tests,tests]
}
var arr = [obj,obj,obj]

const st = {backgroundColor: '#96ff63'};

const ChevronLeftIcon = icons['ChevronLeftIcon'];
const ChevronRightIcon = icons['ChevronRightIcon'];
class QuizRender extends Component {
    constructor(){
        super();
        this.state = {
            counter: 0,
            isend: false,
            request: false,
            is_answer: null,
            answerssMap: [],
            trueCounter: 0
        }

        this.change = this.change.bind(this)
    }
     componentWillMount = () => {
        console.log('WillMount');
        console.log( this.props.QuizMap)
            let ans = []
         this.props.QuizMap.map((k,i)=>
             {
                 ans.push({answers:[], answer: -2 });
                 k.Questions.map(()=>{
                     ans[i].answers.push(false)
                 });
             }
         )
         this.setState({answerssMap: ans})
             };



     inc = ()=>  {
        let counter = this.state.counter;
        let isend = false;
         if (counter+1 === this.props.QuizMap.length) isend = true;
         if (counter+1 <= this.props.QuizMap.length-1) counter = counter+1;
        this.setState({counter: counter,anser: -1,isend: isend,is_answer: null});
    };
    dec = () => {
        let counter = 0;
        if (this.state.counter > 0) counter = this.state.counter-1
        if (this.state.isend) counter = this.state.counter
        this.setState({counter: counter ,anser: -1,isend:false});
    };
    send(){
        console.log('sending...')
    }

    change(e){
        let index =  parseInt(e.target.dataset.index);
        let buf = this.state.answerssMap;
        let notnul = false;
        buf[this.state.counter].answers.map((k)=>{
                if(k === true)
                    notnul=true
            }
        )
        let bf = this.state.trueCounter;
        console.log(buf)
        if ( notnul === false ) {
            buf[this.state.counter].answers[index] = true;
            buf[this.state.counter].answer = -1;
            if (this.props.QuizMap[this.state.counter].Right == index)
            {
                buf[this.state.counter].answer = index;
                bf++;
            }
        }

        this.setState({answerssMap: buf, trueCounter: bf})
    }

    render(){
        return (
            <div  >
                        <div className={"mainRend"}>
                        <div className="hs">
                             { !(this.state.isend )? this.props.QuizMap[this.state.counter].Question : 'Good Work!' }
                        </div>
                        < div className = "QuizRender" >
                            {
                                (!this.state.isend) ?
                                    <div className={' Header2 Header '}>
                                        <div className={'MakeDes'} >Выберите один из Вариантов ответа</div>
                                    </div>
                                    : null
                            }
                    {
                        (!this.state.isend )?


                            (    (this.props.istest === true )?
                                <div  className={'justify_content'} >

                        {this.props.QuizMap[this.state.counter].Questions.map((k, i) =>
                            <div className={'Pointstyle'}
                                 style={ (this.state.answerssMap[this.state.counter].answers[i] &&
                                 this.state.answerssMap[this.state.counter].answer === this.props.QuizMap[this.state.counter].Right
                                 ) ? {backgroundColor: '#96ff63'} : (this.state.answerssMap[this.state.counter].answers[i])? {backgroundColor: '#ff6d5c'} : {} }
                                 data-index = {i}
                                 key={i}
                                 onClick={this.change}>{k}
                            </div>)}
                            {isRight(this.state.answerssMap,this.state.counter,this.props.QuizMap[this.state.counter].Right)}
                        </div>
                                    :
                                    <div  className={'justify_content'} >
                                        {this.props.QuizMap[this.state.counter].Questions.map((k, i) =>
                                        {
                                         return(   <div className={'Pointstyle'}
                                                 style={(this.state.answerssMap[this.state.counter].answers[i]) ? {backgroundColor: '#96ff63'} : {}}
                                                 data-index={i} key={i} onClick={this.change}>
                                             {k}
                                         </div>)
                                         }
                                         )
                                         }
                                    </div>
                            )

                        :
                            <div>
                            {(this.props.istest)?
                        <div style={{marginTop: "10vh" }} >
                            <EndOfQuestion
                                id = {this.props}
                                linck = {this.linck}
                                Questions={this.props.QuizMap}
                                answer={this.state.answerssMap}
                                trueCounter = {this.state.trueCounter}
                            />
                        </div>
                                :
                                <div style={{color: '#212121'}} className="hs">Спасибо!</div>
                        }
                            </div>
                    }
                            { (!this.state.isend )?
                                null
                                :
                                <div style={{ marginTop: '30%' , height: '20%' }} >
                                <Button container ={ <Link  style={{textDecoration: 'none',margin:0,padding:0  }} to={'/'} />}
                                        onClick={()=>{ console.log('cal');  this.props.getQuiz(this.state.answerssMap,this.state.trueCounter)}}  size={'small'}  rounded={true}>
                                    домой
                                </Button>
                                </div>
                            }
                            { (!this.state.isend)?
                                <div style={{marginTop: '12%',width:'100%',height:'50%'}} className={'Header AlignText'}>
                                    <ChevronLeftIcon style={{marginRight:'10%'}} onClick={this.dec} className={'strelka'} color={'#0022CB'}
                                                     size={'20%'} />
                                    <span> {this.state.counter}/{this.props.QuizMap.length} </span>
                                    <ChevronRightIcon
                                        style={{marginLeft:'10%'}}
                                        onClick={this.inc}
                                        className={'strelka'} color={'#0022CB'}  size={'20%'}/>
                                </div>
                                : null
                            }
                        </div>
                        </div>
            </div>

        );
        function isRight(ar,counter,right) {
            if(ar[counter].answer === right)  return (<div className={'answer'}>Верно</div>);
            if (ar[counter].answer === -1) return (<div className={'answer'}>неверно</div>)
            if (ar[counter] === -2) return (null)
        }

    }
}

export default QuizRender;