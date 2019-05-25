import React, {Component} from 'react';
import TestPage from "./TestPage";
import "./TestPage.css"
import Menu from "./Menu";


var obj ={
    Question: "Q",
    right: 1,
    Descripton: "",
    istest: false,
    Questions: ["txt"]
}
var arr = [obj]



class AdminQuizRender extends Component {
    constructor(){
        super();
        this.state = {
            counter: 0,
            anser: -1,
            QuizMap: Object.assign(arr),
            isend: false
        }
        this.change = this.change.bind(this)
    }
    inc = ()=>  {
        let counter =this.state.counter;
        let isend = false;
        if (counter+1 === this.state.QuizMap.length) isend = true;
        if (counter+1 <= this.state.QuizMap.length-1) counter = counter+1;
        this.setState({counter: counter,anser: -1,isend: isend});
    };

    dec = () => {
        let counter = 0;
        if (this.state.counter > 0) counter = this.state.counter -1
        this.setState({counter: counter ,anser: -1,isend:false});
    };

    change = (event)=>
    {
        let buf = Object.assign(this.state.QuizMap);
        buf[this.state.counter].Questions[event.target.id] = event.target.value;
        this.setState({QuizMap: buf })
    }

        add = ()=>{
            let b = Object.assign(this.state.QuizMap);
            b[this.state.counter].Questions.push("");
            this.setState({QuizMap: Object.assign(b)})
        }

    addQu = ()=>{
        this.setState({
            counter: this.state.QuizMap.length,
            QuizMap: [...this.state.QuizMap,{
             Question: 'q',
             Descripton: 'q',
             right: 0,
             Questions: ["txt"]
            }]
        })
        }

    render(){
        console.log('render');
        return (
            <div>
                <Menu/>
                <div className={"mainRend"}>
                    <div className="header hs">
                        <input
                            className={'Pointstyle'}
                            type={'text'}
                            value={this.state.QuizMap[this.state.counter].Question}
                            onChange={(e)=> { let bf = this.state.QuizMap; bf[this.state.counter].Question = e.target.value; this.setState({ QuizMap: bf })}}
                        />
                        {/*{this.state.QuizMap[this.state.counter].Question}*/}
                        <div>{this.state.counter}</div>
                    </div>
                    < div className = "QuizRender" >
                        < div onClick={this.dec}  className="arrow">Arrow </div>
                        {
                            (!this.state.isend )?
                                <div className={'justify_content'} >
                                    {this.state.QuizMap[this.state.counter].Questions.map((k, i) =>
                                        <input type={'text'} value={k} className={'Pointstyle'} id={i} key={i} onChange={ this.change
                                        }/>)}
                                </div>
                                :
                                <div>
                                    Good Work
                                    <button onClick={
                                        ()=>this.props.cl(this.state.QuizMap)
                                    }>Send</button>
                                </div>
                        }
                        <div   className="arrow">
                            <span onClick={this.inc} >  Arrow</span>
                            <span onClick={this.add}> Вариант++</span>
                            <span onClick={this.addQu} > Qestion++</span>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default AdminQuizRender;