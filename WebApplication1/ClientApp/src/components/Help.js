import React, {Component} from 'react';
import Menu from "./Menu";
import {Tabs, TabsItem} from 'rambler-ui/Tabs'
import userHelper from "../utils/userHelper";
const values = ['Учащемуся', 'Преподавателю']


class Help extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: values[0]
        }
    }
    handleChange = (event, value) => {
        this.setState({value})
    }

    render() {
        let user = userHelper.GetUser()
        return (
            <div>
                <Menu user = {user} {...this.props} />

                <div style={{marginBottom: '50%' }} >

                    <div style={{paddingLeft: '38vw'}} >
                    <h3 style={{marginLeft: '11%'}} >Помощь</h3>
                    <Tabs  value={this.state.value} onChange={this.handleChange}>
                        {values.map((item, index) => (
                            <TabsItem
                                value={item}
                                key={index}
                                className="customTabsItemClassName">
                                {item}
                            </TabsItem>
                        ))}
                    </Tabs>
                    </div>
                    {(this.state.value === 'Учащемуся') ?
                        <div style={{paddingLeft: '20%',paddingRight: '20%' }}>
                          <h4 style={{marginLeft: '28%'}} >Краткая справка для учеников</h4>
                            <p>
                                Какая-то инструкция
                            </p>
                        </div>
                        :
                        <div style={{paddingLeft: '20%',paddingRight: '20%' }}>
                            <h4 style={{marginLeft: '28%'}} >Краткая справка для преподавателей</h4>
                            <p>
                                Какая-то инструкция
                            </p>
                        </div>
                    }
                </div>
                <div className={'footer'} >  </div>
            </div>
        );
    }
}

export default Help;