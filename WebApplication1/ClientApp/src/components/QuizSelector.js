import React, {Component} from 'react';
import QuizCard from "./QuizCard";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/QuizMap";
import './selector.css'
import Menu from "./Menu";

var obj = {text: 'sometext', id: 1}, arr = [obj,obj,obj];
class QuizSelector extends Component {

    constructor(props, context) {
        super(props, context);
        this.state =
            {
            QuizMap: arr
            }
    }
      async getData ()
    {

        const url = `api/SampleData/GetQuiz?count=12`;
        const response = await fetch(url,{method:"GET"})
        var res = await response.json();

        this.setState({QuizMap: res});
        console.log(this.state.QuizMap);
        console.log("qqq This is req");
       await  console.log(response);
        console.log(this.state.QuizMap)
    }

    componentWillMount() {
        this.getData()
    }

    render() {
        console.log("arr hear")
        console.log(arr);
        console.log(this.state.QuizMap.data);
        return (
            <div className={'main'} >
                <Menu/>
                <div className={'Header'} > Выберите тест </div>
                <div className={"Page"}>
                {this.state.QuizMap.map( (k,i)=>
                    <QuizCard key={i}
                              text={k.Header}
                              id = {k.Id}
                              obj = {k}
                    />
                    )}
                </div>
            </div>
        );
    }
}
export default connect(
    state => state.weatherForecasts,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(QuizSelector);