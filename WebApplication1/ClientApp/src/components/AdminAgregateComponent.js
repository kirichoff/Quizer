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

class AdminAgregateComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            QuizMap:null,
            vale: null,
            request: true,
            Desc: '',
            counter: 0,
            UserInfo: null,
            istest: true,
            biteImage: null,
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

    SendStat = (obj) =>{
        const url = `api/SampleData/SendStat`;
        let b;
        console.log('call')
        if (obj != null) {
            b = obj
            b["QuizId"] = this.props.match.params.id;
            const body = new FormData();
            for (const pair in b)
                body.append(pair,b[pair])

            body.append('istest',this.state.istest)
            body.append('istest',this.state.istest)

            fetch(url, {
                method: "Post",
                body: body
            }).then(console.log('Sucsces')).catch(e =>
                console.log(e)
            );
        }
    }
    Send = (state) =>{
        const url = 'api/SampleData/AddQuiz'
        const body = new FormData;
        body.append('q',JSON.stringify(
            {
                Header:this.state.vale,
                Baground: '#123H1',
                Items: state,
                istest: this.state.istest
            }))
        fetch(url,{
            method:'Post',
            body: body
        }).then(console.log('success')).catch(e=>console.log(e))
    }



    Tags = () => {
        if(this.state.request)
        {
            switch (this.state.counter) {
                case
                0
                :
                    return (<TestPage next={() => this.setState({counter: 1})}>
                        <input
                            className= {'AdminHeader'}
                            type="text"
                            defaultValue={'Your Header!'}
                            value={this.state.vale}
                            onChange={event => this.setState({vale: event.target.value})}
                        />
                        <Textarea
                            variation="regular"
                            value={this.state.Desc}
                            onChange={event => this.setState({Desc: event.target.value})}
                            placeholder="описание"
                            style={{width: '100%'}}
                            textareaStyle={{minHeight: '100px',maxHeight: '100px',minWidth:"100%"}}
                        />
                        <Radio val1={'тест'} val2 ={'опрос'}  onchange = {
                            ( val1, val2, child ) =>
                            {
                                console.log(val1)
                                this.setState({istest: val1 })
                                console.log(this.state.istest)
                            }
                        }>
                            тип
                        </Radio>
                    </TestPage>);
                case
                1
                :
                    return (<AdminQuizRender
                            cl={this.Send}
                            istest={this.state.istest}
                    />);
            }
        }
    }



    render() {
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