import React, {Component} from 'react';
import {Tabs, TabsItem} from 'rambler-ui/Tabs'
import Button from 'rambler-ui/Button'
import './menu.css'
import {Link} from 'react-router-dom'
import {Popup} from "rambler-ui/Popup";
import Input from "rambler-ui/Input";




const values = ['Home', 'About', 'Contact']
var nav_style = {position: 'relative',top: '0px'}

class Menu extends Component {
    prop

    constructor(props, context) {
        super(props, context);
        this.state = {
            value: values[1],
            customIsOpened: false,
            prevS: window.pageYOffset,
            navBar:{position: 'relative',top: '0px'}
        }
        this.openPopup = this.openPopup.bind(this);

    }

    Scrol = ()=>{
        var nav = {position: "",top:"",zIndex: 200};
        var prevScrollpos = this.state.prevS
        var currentScrollpos = window.pageYOffset;
        if (currentScrollpos <= 0) {
            nav.position = 'relative';
        } else {
            if (prevScrollpos > currentScrollpos) {
                nav.top = "0px";
                nav.position = 'fixed';
            } else {
                nav.top = "-100px";
            }
        }
        prevScrollpos = currentScrollpos;

        this.setState({navBar: nav, prevS: prevScrollpos })
    }

    componentDidMount() {
      if (this.props.scroll)  window.addEventListener("scroll",this.Scrol)
    }

    componentWillUnmount() {
        if (this.props.scroll)   window.removeEventListener("scroll",this.Scrol)
    }

    handleChange = (event, value) => {
        this.setState({value})
    }

    openPopup  (e) {
        console.log(e.target.v)
        this.setState({customIsOpened: true})
        // this.setState({
        //     [`${type}IsOpened`]: true
        // })
    }

    closePopup = () => {
        this.setState({
            customIsOpened: false
        })
    }

    render() {
    // if(this.state.navBar !== undefined) {
    //     console.log('nav: ',this.state.navBar)
    //     var nav = this.state.navBar
    //     var prevScrollpos = window.pageYOffset;
    //     window.onscroll = function () {
    //         var currentScrollpos = window.pageYOffset;
    //         if (currentScrollpos <= 50) {
    //             nav.position = 'relative';
    //         } else {
    //             if (prevScrollpos > currentScrollpos) {
    //                 nav.top = "0px";
    //                 nav.position = 'fixed';
    //             } else {
    //                 nav.top = "-100px";
    //             }
    //         }
    //         prevScrollpos = currentScrollpos;
    //     }
    // }
        return (
                <div id="navbar"
                     style={this.state.navBar}>
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
                        <Button  type={'outline'} size={'small'} rounded={true}>
                            Sign up
                            </Button>
                            <Button onClick={this.openPopup}  style={{marginLeft: 20,marginRight: 10,}} size={'small'}  rounded={true}>
                            Sign in
                            </Button>
                        </div>
                    </div>


                    <Popup
                        title="Войдите"
                        showClose
                        isOpened={this.state.customIsOpened}
                        backdropColor="blue"
                        okButton={
                            <Button type="primary" size="small" onClick={this.closePopup}>
                                Ок
                            </Button>
                        }
                        cancelButton={
                            <Button type="flat" size="small" onClick={this.closePopup}>
                                Отмена
                            </Button>
                        }
                        onRequestClose={this.closePopup}>
                        <div style={{width: 400}}>

                            <Input
                                style={{marginBottom: 5}}
                                type="email"
                                autoFocus
                                value={this.state.inputValue}
                                onChange={this.updateValue}
                            />

                            <Input
                                type="password"
                                autoFocus
                                value={this.state.inputValue}
                                onChange={this.updateValue}
                            />
                        </div>
                    </Popup>



                </div>
        )
    }
}

export default Menu;