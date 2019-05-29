import React, {Component} from 'react';
import {Tabs, TabsItem} from 'rambler-ui/Tabs'
import Button from 'rambler-ui/Button'
import './menu.css'




const values = ['Home', 'About', 'Contact']

class Menu extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: values[1]
        }
    }
    handleChange = (event, value) => {
        this.setState({value})
    }

    render() {

        var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollpos = window.pageYOffset;
            console.log(currentScrollpos)
            if (currentScrollpos <= 50 )
            {
                document.getElementById("navbar").style.position = 'relative';
            }
            else {
                if (prevScrollpos > currentScrollpos) {
                    document.getElementById("navbar").style.top = "0";
                    document.getElementById("navbar").style.position = 'fixed';
                } else {
                    document.getElementById("navbar").style.top = "-100px";
                }
            }

            prevScrollpos = currentScrollpos;

        }


        return (
                <div id="navbar">
                <div style={{marginBottom: 2,marginLeft: 10}}>
                    <img src="../Zaur.png"  style={{height: '10%',width: '10%'}}  alt=""/>
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        {values.map((item, index) => (
                            <TabsItem
                                style = {{marginLeft: '17.5vw'}}
                                value={item}
                                key={index}
                                >
                                {item}
                            </TabsItem>
                        ))}
                    </Tabs>
                    <div style={{ marginTop: 10, float: 'right'}} >

                        <Button type={'outline'} rounded={true}>
                            Sign In
                            </Button>
                            <Button style={{marginLeft: 20}}  rounded={true}>
                            Sign up
                            </Button>

                    </div>

                </div>
                </div>
        )
    }
}

export default Menu;