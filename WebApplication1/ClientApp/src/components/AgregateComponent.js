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
        }).then(data =>
            this.setState({QuizMap: data, request: true})).catch( e=>
            console.log(e)
        );
    };

    testResult = (answers) =>{
        console.log(this.state)
        const url = 'api/SampleData/SetTestResults'
        const body = new FormData;
        body.append('q',JSON.stringify(
            {
                QuizHeader:this.state.QuizMap.Header,
                QuizId: this.state.QuizMap.Id,
                Answers: answers,
                UserTest: userHelper.GetUser()
            }))
        fetch(url,{
            method:'Post',
            body: body
        }).then(()=>this.props.history.push('/bg2/TestsList')

        ).catch(e=>console.log(e))
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
                        QuizMap = {this.state.QuizMap.Items}
                    />);
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div   style={{background: 'linear-gradient(left, #0022cb 0%,#3fd3d8 100%);'}} >
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