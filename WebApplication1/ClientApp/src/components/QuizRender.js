import React, {Component} from 'react';
import TestPage from "./TestPage";
import "./TestPage.css"
import Menu from "./Menu";

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
            isend: false
        }
        this.change = this.change.bind(this)
        this.getQuiz = this.getQuiz.bind(this)
        this.getData = this.getData.bind(this)
    }

     async getData ()
    {
        var dt;
        const url = `api/SampleData/GetQuizById?id=${this.props.match.params.id}`;
        const response = await fetch(url,{
            method:"GET"
        }).then(function(response) { return response.json()}).then(data=>{
            dt = data
            return data

        } );
        this.setState({QuizMap: response.Items});
        this.setState({QuizMap: "qwe"});
        console.log("________________   ")
        console.log(dt);
        console.log(this.state.QuizMap);
        console.log("This is req");
        console.log(response);
        return response.Items
    }

    async getQuiz() {
        let Quizes;
        const url = `api/SampleData/GetQuizById?id=${this.props.match.params.id}`;
        try {
            const response = await fetch(url);
             Quizes = await response.json();
        }
        catch (e) {
            Quizes = arr;
            }
        this.setState({QuizMap: Quizes.Items});
        console.log("state")
        console.log(this.state.QuizMap)
        console.log(Quizes.Items);
    }

     componentWillMount = () => {
        console.log(this.state.counter)
        // console.log(this.getData())
         //this.setState({QuizMap:});
         //this.getQuiz();
    }



     inc = ()=>  {
        let counter =this.state.counter;
        let isend = false;
         if (counter+1 === this.state.QuizMap.length) isend = true;
         if (counter+1 <= this.state.QuizMap.length-1) counter = counter+1;
        this.setState({counter: counter,anser: -1,isend: isend});
        console.log(this.state.counter)
         console.log(this.state)
    }
    dec = () => {
        let counter = 0;

        if (this.state.counter > 0) counter = this.state.counter-1
        this.setState({counter: counter ,anser: -1,isend:false});
        console.log(this.state)
    }

    change  (i)
    {
       this.setState({anser: i})
        console.log(i)

    }
    render(){
        quid_get();
        return (
            <div>
        <Menu/>
                <div className={"mainRend"}>

                        <div className="header hs">
                            { this.state.QuizMap[this.state.counter].Question}
                            {this.state.counter}
                            <br/>
                            Что ты любишь  делаеть когда грустно?
                        </div>
                        <div className="QuizRender">
                            <div onClick={this.dec}  className="arrow">Arrow </div>
                            {
                                (!this.state.isend )?
                                    <div>
                                        { this.state.QuizMap[this.state.counter].Questions.map((k, i) =>
                                        <div onClick={() => this.change(i)}>{k}</div>)}
                                    {isRight(this.state.anser,this.state.QuizMap[this.state.counter].Right)}
                                    </div>
                                    :
                                <div>Good Work</div>
                            }
                            <div onClick={this.inc}  className="arrow">Arrow</div>
                            </div>
                    </div>
            </div>

        );


        async function quid_get () {
            let Quizes;
            const url = `api/SampleData/GetQuizById?id=${this.props.match.params.id}`;
            try {
                const response = await fetch(url);
                Quizes = await response.json();
            }
            catch (e) {
                Quizes = arr;
            }
            this.setState({QuizMap: Quizes.Items});
            console.log("state")
            console.log(this.state.QuizMap)
            console.log(Quizes.Items);
        }

        function isRight(anser,right) {
            if (anser === -1 )
                return ( <div></div> )
            else if(anser === right)  return (<div>True</div>)
            else  return (<div>False</div>)
        }
    }
}

export default QuizRender;