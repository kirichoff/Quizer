import React, {Component} from 'react';
import TestPage from "./TestPage";
import QuizRender from "./QuizRender";
import InfoForm from "./InfoForm";

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

    componentWillMount = () => {
        console.log('WillMount');
        this.getData()
    };

     Tags = () => {
        if(this.state.request)
        {
            switch (this.state.counter) {
                case
                0
                :
                    return (<TestPage next={() => this.setState({counter: 1})}>
                        {this.state.QuizMap.Header}
                    </TestPage>);
                case
                1
                :
                    return (<InfoForm result={(obj) => this.setState({UserInfo: obj, counter: 2})}
                    />);
                case
                2
                :
                    return (<QuizRender
                        QuizMap={this.state.QuizMap.Items}
                    />);
            }
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>

                {this.state.request ?
                    <div>
                        {this.Tags()}
                    </div>
                    : ''
                }
            </div>
        );
    }
}

export default AgregateComponent;