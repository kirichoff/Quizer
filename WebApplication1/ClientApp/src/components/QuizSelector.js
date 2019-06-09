import React, {Component} from 'react';
import QuizCard from "./QuizCard";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/QuizMap";
import './selector.css'
import Menu from "./Menu";
import Button from "rambler-ui/Button";

var obj = {text: 'sometext', id: 1}, arr = [obj,obj,obj];
class QuizSelector extends Component {

    constructor(props, context) {
        super(props, context);
        this.state =
            {
            QuizMap: arr,

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

    componentDidMount() {
        this.getData()
    }



    render() {

        let date = new Date()
        console.log(date.getFullYear())

        return (
            <div className={'main'} >
                <Menu scroll = {true} />
                <div>
                    <div className={'discr'} style={
                        {marginLeft: '14%',
                            marginBottom: "2%"
                            ,height: '60vh', width: '72vw',borderRadius: 20 }}
                    > <h1>Hellow</h1>
                        <p style={{paddingRight: "40%" }}>
                            Соноропериод, в первом приближении, имеет миксолидийский алеаторически
                            выстроенный бесконечный канон с полизеркальной векторно-голосовой
                            структурой,
                            потому что современная музыка не запоминается. Панладовая система, по определению, полифигурно
                            начинает нечетный сет. Фаза сонорна.
                        </p>
                        <Button style={{color: "#ffff",marginTop: 20 }} size={"small"} type={'primary'} rounded={true}>
                            Read more
                        </Button>
                    </div>
                <img src={'../marc-kargel-1621473-unsplash.jpg'} style={
                    {marginLeft: '14%',
                        filter: 'brightness(0.6)',
                        marginBottom: "2%"
                    ,height: '60vh', width: '72vw',borderRadius: 20 }}/>
                </div>

                <div  className={"Page"}>
                {this.state.QuizMap.map( (k,i)=>
                    <QuizCard key={i}
                              text={k.Header}
                              id = {k.Id}
                              obj = {k}
                              desc = {'qweewqrwqr qfsaf asfasfasfasf asfafa'}
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