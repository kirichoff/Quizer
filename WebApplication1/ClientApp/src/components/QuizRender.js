import React, {Component} from 'react';
import TestPage from "./TestPage";
import "./TestPage.css"
import Menu from "./Menu";
import Arrow from "./Arrow";

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
            anser: -1,
            QuizMap: arr,
            isend: false,
            request: false,
            is_answer: false,
            bg: null
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

         this.setState({QuizMap: this.props.QuizMap,bg: ar})

             };
     inc = ()=>  {
        let counter =this.state.counter;
        let isend = false;
         if (counter+1 === this.state.QuizMap.length) isend = true;
         if (counter+1 <= this.state.QuizMap.length-1) counter = counter+1;
        this.setState({counter: counter,anser: -1,isend: isend,is_answer: false});
        this.render()
    };
    dec = () => {
        let counter = 0;
        if (this.state.counter > 0) counter = this.state.counter-1
        this.setState({counter: counter ,anser: -1,isend:false});
    };

    change  = (e)=>
    {
        let index =  parseInt(e.target.dataset.index);
       this.setState({anser:index});
       if(this.state.QuizMap[this.state.counter].Right == index ) {
           let buf = this.state.bg;
           buf[this.state.counter].s[index] ={backgroundColor: '#96ff63'};
           this.setState({is_answer: true,bg: {...buf} });
       }
    }

    render(){
        return (
            <div>
        <Menu/>
                        <div className={"mainRend"}>
                        <div className="header hs">
                            {this.state.QuizMap[this.state.counter].Question}
                        </div>
                        < div className = "QuizRender" >
                            < div onClick={this.dec} style={{margin: '15%' }}   className="arrow">
                                <Arrow  rotate={'top'} />
                            </div>
                    {
                        (!this.state.isend )?
                        <div className={'justify_content'} >
                        {this.state.QuizMap[this.state.counter].Questions.map((k, i) =>
                            <div className={'Pointstyle'} style={this.state.bg[this.state.counter].s[i] } data-index = {i} key={i} onClick={this.change}>{k}</div>)}
                        {isRight(this.state.anser,  this.state.QuizMap[this.state.counter].Right)}
                        </div>
                        :
                        <div>Good Work</div>
                    }
                        <div onClick={this.inc}  className="arrow">
                           <Arrow rotate={'bottom'}/>
                        </div>

                            <div className={"progress"}>
                                <div className={"progress-bar progress-bar-success"} style={{width: ((this.state.counter+1)/(this.state.QuizMap.length))*100+'%' }}>
                                </div>
                            </div>
                        </div>
                        </div>
            </div>

        );
        function is_Answer(is) {
            if(is) return (<div className={'answer'}>Все верно</div>)
        }
        function isRight(anser,right) {
            if(anser === right)  return (<div className={'answer'} >верно</div>);
            if (anser !== -1 ) return (<div className={'answer'} >не </div>)
        }
    }
}

export default QuizRender;