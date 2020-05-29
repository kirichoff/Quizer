import React, {Component} from 'react';
import TestPage from "./TestPage";
import QuizRender from "./QuizRender";
import InfoForm from "./InfoForm";
import Menu from "./Menu";
import userHelper from "../utils/userHelper";

class AgregateComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            QuizMap:null,
            request: false,
            counter: 0,
            UserInfo: null,
        }
    }

    getData = () =>
    {
        const url = `api/SampleData/GetQuizById?id=${this.props.match.params.id}`;
        fetch(url, {
            method: "GET"
        }).then(function (response) {
            return response.json()
        }).then(data => {
                this.setState({QuizMap:data, request: true})
            }
        ).catch( e=>
            console.log(e)
        );
    };
     getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    mix = (quiz) => {
        let uniqOrder = new Set();
        while (uniqOrder.size < quiz.length){
            uniqOrder.add(this.getRandomInt(0,quiz.length))
        }
        let newQuiz = [];
        for(let i of uniqOrder){
            let item = quiz[+i];
         newQuiz.push({...item})
        }
        return newQuiz;
    }

    testResult = (answers) =>{
        console.log(this.state)
        console.log(answers)
        const url = 'api/SampleData/SetTestResults'
        const body = new FormData;
        body.append('q',JSON.stringify(
            {
                QuizHeader:this.state.QuizMap.Header,
                QuizId: this.state.QuizMap.Id,
                Answers: [...answers],
                UserTest: userHelper.GetUser()
            }))
        fetch(url,{
            method:'Post',
            body: body
        }).catch(e=>console.log(e))
    }

    componentWillMount = () => {
      //  document.getElementsByTagName("body")[0].style.background='-webkit-linear-gradient(left, #0022cb 0%,#3fd3d8 100%)';
    };

     Tags = () => {
        if(this.state.request)
        {
            switch (this.state.counter) {
                case
                0
                :
                    return (<TestPage
                        next={() => this.setState({counter: 1})}>
                        {this.state.QuizMap.Header}
                    </TestPage>);
                case 1:
                    return (<QuizRender
                        sendResult={this.testResult}
                        QuizMap = {this.mix(this.state.QuizMap.Items)}
                    />);
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div   style={{background: 'linear-gradient(left, #0022cb 0%,#3fd3d8 100%)'}} >
                <Menu style={{margin:0}} />
                {this.state.request ?
                    <div className={'TestPageBody'} >
                        {this.Tags()}
                    </div>
                    : ''
                }
            </div>
        );
    }
}

export default AgregateComponent;