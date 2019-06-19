import React, {Component} from 'react';
import TestPage from "./TestPage";
import QuizRender from "./QuizRender";
import InfoForm from "./InfoForm";
import Menu from "./Menu";

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

    SendStat = (answers,right_count) =>{
        const url = `api/SampleData/SendStat`;
        let b;
        console.log('call Send')
        let obj = this.state.UserInfo
        if (obj != null) {
             const body = new FormData();
            obj.answerssmap = answers
            obj.QuizId = this.props.match.params.id
            obj.right_count = right_count
            body.append('body', JSON.stringify(obj))

            console.log(body)

            fetch(url, {
                method: "Post",
                body: body
            }).then(console.log('Success')).catch(e =>
                console.log(e)
            );
        }
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
                        payload={<p>
                            {this.state.QuizMap.Description}
                        </p>}
                        next={() => this.setState({counter: 1})}>
                        {this.state.QuizMap.Header}
                    </TestPage>);
                case
                1
                :
                    return (<InfoForm prev={() => this.setState({counter: 0})}   result={(obj) => {
                        this.setState({UserInfo: obj, counter: 2});
                    }}
                    />);
                case
                2
                :
                    return (<QuizRender
                        QuizMap = {this.state.QuizMap.Items}
                        istest = {this.state.QuizMap.istest}
                        getQuiz = {this.SendStat}
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