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
                    <img src="../Zaur.png"  style={{height: '4vw',width: '7vw'}}  alt=""/>
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        {values.map((item, index) => (
                            <TabsItem
                                style = {{marginLeft: '20%'}}
                                value={item}
                                key={index}
                                >
                                {item}
                            </TabsItem>
                        ))}
                    </Tabs>
                    <div style={{ marginTop: 5}} >
                        <div style={ {  marginBottom:5,   float: 'right'}}>
                        <Button type={'outline'} size={'small'} rounded={true}>
                            Sign In
                            </Button>
                            <Button style={{marginLeft: 20,marginRight: 10,}} size={'small'}  rounded={true}>
                            Sign up
                            </Button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Menu;