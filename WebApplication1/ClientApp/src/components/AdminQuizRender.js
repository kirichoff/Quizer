import React, {Component} from 'react';
import "./TestPage.css"
import './chebox.css'
import Menu from "./Menu";
import Arrow from "./Arrow";
import {Link} from "react-router-dom";


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
            isend: false,
            isGoing: false
        }
        this.change = this.change.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleInputChange(event) {

        const target = event.target;
        const  index = parseInt(event.target.dataset.index);
        const map = this.state.QuizMap

        map[this.state.counter].right = index

        console.log(this.state.QuizMap)

        this.setState({QuizMap: map})

    }

    render(){
        console.log('render');
        return (
            <div>
                <Menu/>
                <div className={"mainRend"}>
                    <div className="header ">
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
                        < div onClick={this.dec}  className="arrow">
                            <Arrow rotate={'top'} />
                        </div>
                        {
                            (!this.state.isend )?
                                <div className={'justify_content'} >
                                    {this.state.QuizMap[this.state.counter].Questions.map((k, i) =>
                                        <div className={'sizz'} >
                                            <span>
                                            <label className={'container'} >
                                            <input
                                                name="isGoing"
                                                type="checkbox"
                                                data-index={i}
                                                checked={ (this.state.QuizMap[this.state.counter].right === i)? true : false }
                                                onChange={this.handleInputChange} />
                                                <span className={'checkmark'}></span>
                                            </label>
                                                </span>
                                        <span><input type={'text'} value={k} className={'Pointstyle'} id={i} key={i} onChange={ this.change
                                        }/>
                                        </span>
                                        </div>
                                        )}
                                            <span onClick={this.add}>
                                                <svg className={'PlusQues'} id='Capa_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'>
                                    <path d='M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2	s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2	S39.604,28,38.5,28z'
                                        />
                                                </svg>
                                            </span>
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
                            <span onClick={this.inc} > <Arrow rotate={'bottom'} /></span>
                            <span onClick={this.addQu} > Qestion++</span>
                        </div>


                        { (!this.state.isend)?

                            <div  style={{height: '20%',width: '120%'}} className={"prog"}>
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
        function check(map){



        }
    }
}

export default AdminQuizRender;