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


class QuizRender extends Component {
    constructor(){
        super();
        this.state = {
            counter: 0,
            anser: -1,
            QuizMap: arr,
            isend: false,
            request: false
        }
        this.change = this.change.bind(this)
    }
     componentWillMount = () => {
        console.log('WillMount');
     this.setState({QuizMap: this.props.QuizMap})
             };
     inc = ()=>  {
        let counter =this.state.counter;
        let isend = false;
         if (counter+1 === this.state.QuizMap.length) isend = true;
         if (counter+1 <= this.state.QuizMap.length-1) counter = counter+1;
        this.setState({counter: counter,anser: -1,isend: isend});
        console.log(this.state.counter)
         console.log(this.state)
    };
    dec = () => {
        let counter = 0;
        if (this.state.counter > 0) counter = this.state.counter-1
        this.setState({counter: counter ,anser: -1,isend:false});
        console.log(this.state)
    };

    change  (i)
    {
       this.setState({anser: i});
        console.log(i)
    }

    render(){
            console.log('render');
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
                            <div className={'Pointstyle'} key={i} onClick={() => this.change(i)}>{k}</div>)}
                        {isRight(this.state.anser, this.state.QuizMap[this.state.counter].Right)}
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
        function isRight(anser,right) {
            if(anser === right)  return (<div>True</div>);
            if (anser !== -1 ) return (<div>False</div>)
        }
    }
}

export default QuizRender;