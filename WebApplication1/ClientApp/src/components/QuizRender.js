import React, {Component} from 'react';
import TestPage from "./TestPage";
import "./TestPage.css"
import Menu from "./Menu";
import Arrow from "./Arrow";
import EndOfQuestion from "./EndOfQuestion";
import {Link} from "react-router-dom";

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

class QuizRender extends Component {
    constructor(){
        super();
        this.state = {
            counter: 0,
            isend: false,
            request: false,
            is_answer: null,
            answerssMap: []
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
        console.log(buf)
        if ( notnul === false ) {
            buf[this.state.counter].answers[index] = true;
            buf[this.state.counter].answer = -1;
            if (this.props.QuizMap[this.state.counter].Right == index)
            {
                buf[this.state.counter].answer = index;
            }
        }
        this.setState({answerssMap: buf})
    }

    render(){
        return (
            <div  >
        <Menu/>
                        <div className={"mainRend"}>
                        <div className="header hs">
                             { !(this.state.isend )? this.props.QuizMap[this.state.counter].Question : 'Good Work!' }
                        </div>
                        < div className = "QuizRender" >
                            < div onClick={this.dec} style={{margin: '15%' }}   className="arrow">
                                <Arrow  rotate={'top'} />
                            </div>
                    {
                        (!this.state.isend )?


                            (    (this.props.istest === false )?
                                <div className={'justify_content'} >
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
                                    <div className={'justify_content'} >
                                        {this.props.QuizMap[this.state.counter].Questions.map((k, i) =>
                                        {
                                         return(   <div className={'Pointstyle'}
                                                 style={(this.state.answerssMap[this.state.counter].answers[i]) ? {backgroundColor: '#96ff63'} : {}}
                                                 data-index={i} key={i} onClick={this.change}>{k}</div>)
                                        }
                                        )
                                        }
                                    </div>
                            )

                        :
                        <div style={{marginTop: "10vh" }} >
                            <EndOfQuestion
                                linck = {this.linck}
                                Questions={this.props.QuizMap}
                                answer={this.state.answerssMap} />
                        </div>
                    }
                            { (!this.state.isend )?
                                <div onClick={this.inc} className="arrow">
                                    <Arrow rotate={'bottom'}/>
                                </div>
                                :


                                <Link  style={{textDecoration: 'none'  }} className={'justify_content'}  to={'/'} >
                                    <div>
                                        <div className={'Home'}>
                                            <div className={'pos'}>Home</div>
                                            <div className={'toHome'}></div>
                                        </div>
                                    </div>
                                </Link>
                            }
                            { (!this.state.isend)?
                                <div className={"prog"}>
                            <div className={"progress"}>
                                <div className={"progress-bar progress-bar-success"} style={{width: ((this.state.counter+1)/(this.props.QuizMap.length))*100+'%' }}>
                                </div>
                            </div>
                                <div className={'answer'}>{this.state.counter}  </div>
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