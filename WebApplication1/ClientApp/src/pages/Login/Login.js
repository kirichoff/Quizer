import React, {useEffect, useState} from 'react';
import '../../components/Infoform.css'
import Menu from "../../components/Menu";
import Button from "rambler-ui/Button";
import Input from "rambler-ui/Input";
import {Popup} from "rambler-ui/Popup";
import {Toggle, ToggleOption} from 'rambler-ui/Toggle';
import {Link} from "react-router-dom";
import RegisterFragment from "./RegisterFragment";
import userHelper from "../../utils/userHelper";

 function Login (props){
    const [isRegister,setRegister] = useState(false)
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [status,seStatus] = useState('')

     const [newUser,setUser] = useState({})
     const [key,setKey] = useState({})

     let testLogin = (text) => {
        let rge = /([0-30]+(Т|П|т|п)[0-900]+)/
        return rge.test(text)
     }
     let register = () => {
        if(newUser.Type == 2){
            fetch(`api/SampleData/Register?user=${JSON.stringify(newUser)}&adminKey=${key}`).then(()=>
                setRegister(false)
            )
        }
        else{
            if(testLogin(newUser.Login)){
                fetch(`api/SampleData/Register?user=${JSON.stringify(newUser)}&adminKey=${key}`).then(()=>
                    setRegister(false)
                )
            }
        }
     }
     useEffect(()=>{
         let user = userHelper.GetUser()
         if(user){
             props.history.push('/bg2/TestsList')
         }
     },[])

     let request = () =>{
         if(isRegister){
             register()
         }
         else {
             getLogin()
         }
     }


    let getLogin = async () => {
        if (password != '') {
            const url = `api/SampleData/Login?name=${login}&pas=${password}`;
            const response = await fetch(url, {method: "GET"});
            const Log = await response.json();
            console.log(Log);
            seStatus(Log)
            if (Log != "false" && Log) {
                userHelper.setUser(Log)
                props.history.push('/bg2/TestsList')
            } else {
                // this.setState({isFail: true});
            }
        }
    }


    let user = userHelper.GetUser();
    return (
        <div>
            <Menu user={user} {...props}/>
            <div style={{
                margin: 'auto',
                marginTop: '8vh',
                width: '60vw'
            }} className={'Wel2'}>
                <div>
                    <div style={{padding:0,fontSize: '30px'}} className="hpos header">Войдите</div>
                    <div className="some center">

                        <div style={{marginBottom: '5%', color: 'red'}}>
                            {status==="false"? 'Неверное имя пользователя или пароль' : null}
                        </div>
                        {
                            !isRegister?
                                <>
                                    <div>имя пользователя</div>
                                <Input
                                    style={{marginBottom: 5}}
                                    type="text"
                                    status={!testLogin(login)? 'error' : null}
                                    autoFocus
                                    placeholder={'№студента/отделение/№группы'}
                                    value={login}
                                    onChange={(e)=>setLogin(e.target.value)}
                                />
                                    <div>пароль</div>
                                <Input
                                    type="password"
                                    autoFocus
                                    placeholder={'пароль'}
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                                    <div
                                        style={{marginTop:'10px'}}
                                        className={'LnStyle'}
                                        onClick={()=>setRegister(true)}
                                    >
                                        Регистарция
                                    </div>
                                </>
                                :
                            <RegisterFragment
                                toLogin={()=>setRegister(false)}
                                testLogin={testLogin}
                                onChange={(us,key)=> {
                                    setUser(us);
                                    setKey(key);
                                }}
                            />
                        }
                        <div style={{display: 'flex',justifyContent: 'space-between',marginTop: '10px'}} >
                            <Button type="primary" onClick={request
                            }>
                                Ок
                            </Button>
                            <Button
                                type="outline" onClick={() => {
                            }}>
                                Отмена
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;