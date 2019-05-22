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
            bg: null,
            answerMap: []
        }
        this.change = this.change.bind(this)
    }
     componentWillMount = () => {
        console.log('WillMount');
        console.log( this.props.QuizMap)
            let ar = [];
        this.props.QuizMap.map((k,i)=>
            {
                ar.push({s:[]});
                    k.Questions.map(()=>{
                        ar[i].s.push(null)
                    });
            }


        )
            let mp = new Array(this.props.QuizMap.length).fill("skip");
         this.setState({QuizMap: this.props.QuizMap,bg: ar,answerMap: mp})
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

    change  = (e)=>
    {
        let index =  parseInt(e.target.dataset.index);
       let notnul =false;
       this.state.bg[this.state.counter].s.map((k)=>{
            if(k !== null)
                notnul=true
            }
       )
       if( (this.state.QuizMap[this.state.counter].Right == index) && !notnul   ) {
           let buf = this.state.bg;
           buf[this.state.counter].s[index] ={backgroundColor: '#96ff63'};
           let ar = this.state.answerMap;
           ar[this.state.counter] = "true";
           this.setState({is_answer: 'Верно',bg: {...buf} });
       }
       else if(!notnul)
        {
            let buf = this.state.bg;
            buf[this.state.counter].s[this.props.QuizMap[this.state.counter].Right] ={backgroundColor: '#96ff63'};
            buf[this.state.counter].s[index] ={backgroundColor: '#ff6d5c'};
            let ar = this.state.answerMap;
            ar[this.state.counter] = "false";
            this.setState({is_answer: 'Неверно',bg: {...buf} });
        }
    }

    send(){
        console.log('sending...')
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
                        <div className={'justify_content'} >
                        {this.props.QuizMap[this.state.counter].Questions.map((k, i) =>
                            <div className={'Pointstyle'} style={this.state.bg[this.state.counter].s[i] } data-index = {i} key={i} onClick={this.change}>{k}</div>)}
                            {isRight(this.state.answerMap,this.state.counter)}
                        </div>
                        :
                        <div style={{marginTop: "10vh" }} >
                            <EndOfQuestion
                                linck = {this.linck}
                                Questions={this.props.QuizMap}
                                answer={this.state.answerMap} />
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
        function isRight(ar,counter) {
            if(ar[counter]=== 'true')  return (<div className={'answer'}>Верно</div>);
            if (ar[counter] === 'false') return (<div className={'answer'}>неверно</div>)
            if (ar[counter]=== 'skip') return (null)
        }

    }
}

export default QuizRender;