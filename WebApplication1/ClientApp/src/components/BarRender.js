import React, {PureComponent} from 'react';
import data from "./data";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import Menu from "./Menu";


class BarRender extends PureComponent {




    render() {

        function f(data)  {

            let obj = []

            for (var key in data[1]){
                console.log(key)
                obj.push(<Bar dataKey={key} fill="#8884d8" />)

            }
            obj.splice(0,1);
            return obj;
        }

        return (
            <div>
                <BarChart width={730} height={250} data={this.props.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {f(this.props.data)}
                </BarChart>
            </div>
        );
    }
}

export default BarRender;



