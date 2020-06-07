import React, {Component} from 'react';
import TestPage from "./TestPage";
import QuizRender from "./QuizRender";
import InfoForm from "./InfoForm";
import AdminQuizRender from "./AdminQuizRender";
import Radio from "./Radio";
import  './AdminAgregatecss.css'
import Textarea from 'rambler-ui/Textarea'
import FormGroup from 'rambler-ui/FormGroup'
import InputStatus from 'rambler-ui/InputStatus'
import Menu from "./Menu";
import {Toggle, ToggleOption} from "rambler-ui/Toggle";
import userHelper from "../utils/userHelper";
import {Input} from "rambler-ui";


class Ques {
    Question = "Содержание вопроса";
    Questions = [{Text: "", right: false, Point: 0}]

    constructor() {

    }
}

class AdminAgregateComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            QuizMap:[new Ques()],
            vale: "",
            request: true,
            counter: 0,
            maxPoint: 0,
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
            this.setState({QuizMap: [...data.Items],maxPoint: data.MaxPoints,vale: data.Header, request: true})).catch( e=>
            console.log(e)
        );
    };


    componentDidMount() {
        if(this.props.match.params.id){
            this.getData();
        }
    }

    Send = (state) =>{
        console.log(this.state)
        let url = 'api/SampleData/AddQuiz'

        if(this.props.match.params.id){
             url = 'api/SampleData/UpdateQuiz?id='+this.props.match.params.id;
        }
        const body = new FormData;
        body.append('q',JSON.stringify(
            {
                Header:this.state.vale,
                Items: state,
                MaxPoints: this.state.maxPoint,
                UserAccount: userHelper.GetUser()
            }))
        fetch(url,{
            method:'Post',
            body: body
        }).then(()=>this.props.history.push('/bg2/TestsList')

        ).catch(e=>console.log(e))
    }

    Tags = () => {
        if(this.state.request)
            {
                switch (this.state.counter) {
                    case
                    0
                    :
                        return (<TestPage
                            next={() => this.setState({counter: 1})}>
                            <input
                                className= {'AdminHeader'}
                                type="text"
                                placeholder={'Заголовок'}
                                value={this.state.vale}
                                onChange={event => this.setState({vale:event.target.value})}
                            />
                           <div style={{fontSize:'15px'}}>Максимальное количество балов</div>
                            <Input
                                value={this.state.maxPoint}
                                onChange={(e)=>this.setState({maxPoint:  Math.abs(+e.target.value)})}
                                style={{
                                    marginLeft: '32%',
                                    width:'250px'
                                }}
                                type={'number'}
                            />
                        </TestPage>);
                    case
                    1
                    :
                        return (<AdminQuizRender
                                cl={this.Send}
                                QuizMap={this.state.QuizMap}
                                history={this.props.history}
                                maxPoint={this.state.maxPoint}
                                istest={this.state.istest}
                        />);
                }
            }
    }

    render() {
        let user = userHelper.GetUser();
        return (
            <div  >
                <Menu style={{margin:0}} />
                {this.state.request ?
                    <div className={'TestPageBody'}>
                        {this.Tags()}
                    </div>
                    : ''
                }
            </div>
        );
    }
}

export default AdminAgregateComponent;