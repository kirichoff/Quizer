import React, {Component} from 'react';
import RecatDOM from 'react-dom'
import QuizCard from "./QuizCard";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/QuizMap";
import './selector.css'
import Menu from "./Menu";
import Button from "rambler-ui/Button";
import Loader from 'rambler-ui/Loader'
import CarouselMain from "./СarouselMain";
var obj = {text: 'sometext', id: 1}, arr = [obj,obj,obj];
class QuizSelector extends Component {

    constructor(props, context) {
        super(props, context);
        this.state =
            {
            QuizMap: arr,
            response: false,
                log: false
            }
    }

     sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

      async getData ()
    {
        const url = `api/SampleData/GetQuiz?count=12`;
        const response = await fetch(url,{method:"GET"})
        var res = await response.json();
        // await this.sleep(1000);
        console.log(res)
        this.setState({QuizMap: res,response: true})
    }
    componentWillMount() {

    }

    componentDidMount() {
        this.getData()
    }



    Remove = (id)=>{
        const url = `api/SampleData/Delete?id=${id}`;
        const response =  fetch(url,{method: "POST"});
        console.log(id)
        console.log('delete ?',response.status);
    }

    render() {
        let date = new Date()
        console.log(date.getFullYear())

        return (
            <div className={'main'} >
                <Menu LogIn = {(bl)=>this.setState({log:bl})} scroll = {true} />
                <div>
                    { (this.state.response)?
                        <div>
                            <CarouselMain/>
                        <div  className={"Page"}>
                            {this.state.QuizMap.map( (k,i)=>
                                    <QuizCard
                                          img = {(k.Baground)? k.Baground : '../immge.jpg' }
                                            isLog ={this.state.log}
                                            key={i}
                                              to={'bg/Test/'}
                                              text={k.Header}
                                              id = {k.Id}
                                              obj = {k}
                                              desc = {k.Description}
                                              Remove={this.Remove}
                                    />
                                )}

                        {(this.state.log)?
                            <div   style={{filter: 'grayscale(.75)'}} >
                            <QuizCard

                                        key={241}
                                      to={'bg/Admin/'}
                                      text={"Доабавить тест"}
                                      id = {'k.Id'}
                                      obj = {{}}
                                      desc = {'какой-то тескст'}
                                      Remove={this.Remove}
                                        img = {'../immge.jpg'}
                            />
                            </div>
                            : null
                        }

                        </div>

                        </div>
                        :
                            <Loader  style={{transform: 'scale(2)' ,marginTop: '35%'}} loading={!this.state.response} />

                    }
                </div>


                <div className={'footer'} >  </div>

            </div>
        );
    }
}
export default connect(
    state => state.weatherForecasts,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(QuizSelector);