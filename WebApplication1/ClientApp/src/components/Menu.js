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
            SignUpOpened: false,
            Key: '',
            name: '',
            pass: '',
            isKey: false,
            isFail: false,
            prevS: window.pageYOffset,
            navBar:{position: 'relative',top: '0px'},
            LogIn: {isLogin: false,isAdmin: false,name:'' }
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
    openPopup =()=> {
        this.setState({customIsOpened: true})
        // this.setState({
        //     [`${type}IsOpened`]: true
        // })
    }

    openPopup2 = ()=>{
        this.setState({SignUpOpened: true,name: '',pass: ''})
    }

    updateValue = type => e=> {
        this.setState({
            [`${type}`]: e.target.value
         })
        }

   async getLogin ()
    {
        console.log(this.state)
        if (this.state.pass != '') {
            const url = `api/SampleData/Login?name=${this.state.name}&pas=${this.state.pass}`;
            const response = await fetch(url, {method: "GET"});
            const Log = await response.json();

            console.log(Log);

            if (Log == "true") {
                this.props.LogIn(true)
                this.setState({
                    LogIn:
                        {isLogin: true, isAdmin: Log.isAdmin, name: this.state.name}
                })
                this.closePopup()
            } else {
                this.setState({isFail: true});
            }
        }
    }


   async Reg()
    {
        const url = `api/SampleData/Reg?name=${this.state.name}&pas=${this.state.pass}&key=${this.state.Key}`;
        const response = await fetch(url);
        const Log = await response.json();

        if(Log.key){
            this.setState({name: '',pass: ''})
            this.closePopup2()
        }
        else {
            this.setState({isKey: true})
        }
    }


    closePopup2 = () => {
        this.setState({
            SignUpOpened: false,
            isFail: false
        })
    }

    closePopup = () => {
        this.setState({
            customIsOpened: false,
            isFail: false
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
                     style={{...this.state.navBar,...this.props.style}}>
                    <img src="../Zaur.png"  style={{height: '4vw',width: '7vw'}}  alt=""/>
                    <div style={{marginTop: '3%'}} >
                    <Link className={'LnStyle '} to={'/'} >Главная</Link>
                    <Link className={'LnStyle'} to={'/'} >О нас</Link>
                    <Link className={'LnStyle'} to={'/'} >Связь</Link>
                    </div>

                    <div style={{ marginTop: 5}} >
                        <div style={ {  marginBottom:5,   float: 'right'}}>
                        <Button onClick={this.openPopup2} type={'outline'} size={'small'} rounded={true}>
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
                            <Button type="primary" size="small" onClick={()=> this.getLogin()}>
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
                            <div style={{marginBottom: '5%',color: 'red' }} >{(this.state.isFail)? 'Неверное имя пользователя или пароль' : null}</div>
                            <Input
                                style={{marginBottom: 5}}
                                type="email"
                                status={(this.state.isFail)? 'error': ''}
                                autoFocus
                                placeholder={'имя'}
                                value={this.state.name}
                                onChange={this.updateValue('name')}
                            />

                            <Input
                                type="password"
                                autoFocus
                                placeholder={'пароль'}
                                status={(this.state.isFail)? 'error': ''}
                                value={this.state.pass}
                                onChange={this.updateValue('pass')}
                            />
                        </div>
                    </Popup>


                    <Popup
                        title="Регистрация"
                        showClose
                        isOpened={this.state.SignUpOpened}
                        backdropColor="blue"
                        okButton={
                            <Button type="primary" size="small" onClick={this.closePopup2}>
                                Ок
                            </Button>
                        }
                        cancelButton={
                            <Button type="flat" size="small" onClick={this.closePopup2}>
                                Отмена
                            </Button>
                        }
                        onRequestClose={this.closePopup2}>
                        <div style={{width: 400}}>
                            <div style={{marginBottom: '5%',color: 'red' }} >{(this.state.isKey)? 'Неверный ключ' : null}</div>
                            <Input
                                style={{marginBottom: 5}}
                                type="email"
                                placeholder={'имя'}
                                status={(this.state.isFail)? 'error': ''}
                                autoFocus
                                value={this.state.name}
                                onChange={this.updateValue('name')}
                            />

                            <Input
                                type="password"
                                style={{marginBottom: 5}}
                                autoFocus
                                placeholder={'пароль'}
                                value={this.state.pass}
                                onChange={this.updateValue('pass')}
                            />
                            <Input
                                type="text"
                                placeholder={'ключ'}
                                autoFocus
                                status={(this.state.isKey)? 'error': ''}
                                value={this.state.pass}
                                onChange={this.updateValue('Key')}
                            />

                        </div>
                    </Popup>

                </div>
        )
    }
}

export default Menu;