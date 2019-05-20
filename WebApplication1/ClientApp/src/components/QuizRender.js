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
            is_answer: null,
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
        this.setState({counter: counter,anser: -1,isend: isend,is_answer: null});
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
       let notnul =false;

       this.state.bg[this.state.counter].s.map((k)=>{
            if(k !== null)
                notnul=true
            }
       )
       if( (this.state.QuizMap[this.state.counter].Right == index) && !notnul   ) {
           let buf = this.state.bg;
           buf[this.state.counter].s[index] ={backgroundColor: '#96ff63'};
           this.setState({is_answer: 'Верно',bg: {...buf} });
       }
       else if(!notnul)
        {
            let buf = this.state.bg;
            buf[this.state.counter].s[this.state.QuizMap[this.state.counter].Right] ={backgroundColor: '#96ff63'};
            buf[this.state.counter].s[index] ={backgroundColor: '#ff6d5c'};
            this.setState({is_answer: 'Неверно',bg: {...buf} });
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
                        {/*{isRight(this.state.anser,  this.state.QuizMap[this.state.counter].Right,this.state.is_answer)}*/}
                            { (this.state.is_answer)? <div className={'answer'}>{this.state.is_answer}</div> : null}
                        </div>
                        :
                        <div>Good Work</div>
                    }
                        <div onClick={this.inc}  className="arrow">
                           <Arrow rotate={'bottom'}/>
                        </div>


                            { (!this.state.isend)?
                                <div className={"progress"}>
                            <div className={"progress"}>
                                <div className={"progress-bar progress-bar-success"} style={{width: ((this.state.counter+1)/(this.state.QuizMap.length))*100+'%' }}>
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
        function isRight(anser,right,isan) {
            if(anser === right )  return (<div className={'answer'}>{isan}</div>);
            if (anser !== -1 ) return (<div className={'answer'}>{isan}</div>)
        }

    }
}

export default QuizRender;