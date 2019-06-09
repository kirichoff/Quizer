import React, {Component} from 'react';
import Menu from "./Menu";
import PieRender from "./PieRender";
import BarRender from "./BarRender";

class StatistickRender extends Component {
    constructor(props, context) {
        super(props, context);
    this.state = {
        Sex: [],
        response: false
        }
    }

    async componentWillMount() {

        const url = `api/SampleData/GetGender?id=${this.props.match.params.id}`;
        const response = await fetch(url,{method:"GET"})
        var res = await response.json();
        console.log(res)
        this.setState({Sex: res, response: true});
    }

    render() {
        return (
            <div>
            <Menu  />
                <h1>Статистика</h1>
                {(this.state.response)?
                <div>
                    Женьщины/Мужчины
                <PieRender value1={this.state.Sex[0]} value2={this.state.Sex[1]} />
                </div>
                    : null
            }
            </div>
        );
    }
}

export default StatistickRender;