import React, {Component} from 'react';
import Menu from "./Menu";
import PieRender from "./PieRender";
import BarRender from "./BarRender";
import Example from "./Pie2";
import Loader from "rambler-ui/Loader";

class StatistickRender extends Component {
    constructor(props, context) {
        super(props, context);
    this.state = {
        Sex: [],
        Work: [],
        Location: [],
        StatsQ: [],
        response: false,
        QuizA: {}
        }
    }
    async getData (id)
    {
        const url = `api/SampleData/GetQuizById?id=${id}`;
        const response = await fetch(url,{method:"GET"})
        var res = await response.json();

        return  res
    }
    async componentWillMount() {

        const id = this.props.match.params.id;
        const Genderurl = `api/SampleData/GetGender?id=${id}`;
        let response = await fetch(Genderurl,{method:"GET"})
        const Sex = await response.json();
        const WorkUrl =`api/SampleData/GetWork?id=${id}`;
         response = await fetch(WorkUrl,{method:"GET"});
         const Work = await response.json();
        const LocationUrl =`api/SampleData/GetLocation?id=${id}`;
        response = await fetch(LocationUrl,{method:"GET"});
        const Location = await response.json();
        const StatsQUrl =`api/SampleData/GetStatsQ?id=${id}`;
        response = await fetch(StatsQUrl,{method:"GET"});
        const StatsQ = await response.json();
        console.log('Statsq');
        console.log(StatsQ);

       const QuizA = await  this.getData(id);
        console.log('QuizA');
        console.log(QuizA);
        this.setState({Sex: Sex,Work: Work,Location: Location,StatsQ: StatsQ ,QuizA: QuizA ,response: true});
    }

    dataConvert = () => {

        let length =this.state.StatsQ.length;
        let length2 =this.state.StatsQ[0].length;
        let data= new Array(length);
        let dt = this.state.QuizA;
        var counter = 0
        for(let i=0; i<length;i++) {
            data[i] = {name: dt.Items[i].Question}

            for(var key in dt.Items[i].Questions) {
                data[i][ 'ответ '+ counter] = this.state.StatsQ[i][counter]
                    counter++;
            }
            counter=0;
        }
        console.log(data)
        return data
    }

    render() {
        return (
            <div  >
            <Menu  />
            <div style={{padding: '0 0% 0 0%' }} >
                <h1  style={{textAlign:'center'}} >Статистика</h1>
                {(this.state.response)?
                    <div>
                <div  className={'justify_content'} style={{display: 'flex',overflow: 'hidden'}} >

                    <span style={{paddingLeft:'2%',paddingTop: '0' }} >
                        <Example  data={
                            [{ name: 'Мужчины', value: this.state.Sex[0]} ,
                                { name: 'Женьщины', value: this.state.Sex[1]},]
                        } />
                    </span>

                    <span style={{paddingLeft:'0%',paddingTop: '0' }} >
                        <Example  data={
                            [{ name: 'Работают', value: this.state.Work[0]} ,
                                { name: 'Безработны', value: this.state.Work[1]},]
                        } />
                    </span>

                    <span style={{paddingLeft:'0%',paddingTop: '0' }} >
                        <Example  data={
                            [{ name: 'Город', value: this.state.Location[0]} ,
                                { name: 'Село', value: this.state.Location[1]},]
                        } />
                    </span>
                </div>
                        <div style={{marginLeft:"25%"}} >
                        <BarRender data={this.dataConvert()}  />
                        </div>
                    </div>
                    :
                    <Loader  style={{transform: 'scale(2)' ,marginTop: '35%'}} loading={!this.state.response} />
            }
            </div>

            </div>

        );
    }
}

export default StatistickRender;