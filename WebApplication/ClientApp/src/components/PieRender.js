import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Sector, Cell,
} from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
                                   cx, cy, midAngle, innerRadius, outerRadius, percent, index,
                               }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x-20} y={y-30} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}% ${data[index].name}`}
        </text>
    );
};

export default class PieRender extends PureComponent {
    render() {
        return (
            <PieChart width={400} height={400}>
                <Pie
                    data={
                        this.props.data
                    }
                    cx={200}
                    cy={200}
                    nameKey='name'
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {
                        data.map((entry, index) => <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        );
    }
}
