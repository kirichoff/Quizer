import React, {Component} from 'react';
import Button from 'rambler-ui/Button'
import './menu.css'
import {Link} from 'react-router-dom'
import userHelper from "../utils/userHelper";


const values = ['Home', 'About', 'Contact']
var nav_style = {position: 'relative', top: '0px'}

function Menu(props){
    let us = props.user;
        return (
            <div id="navbar">
                <Link to={'/'} >
                <div className={'newLogo'}>Tests</div>
                </Link>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <Link className={'LnStyle'} to={'/Help'}> Помощь </Link>
                    {us ? <Link className={'LnStyle'} to={'/bg2/TestsList'}>Список тестов </Link> : null}
                </div>
                <div style={{marginTop: 5}}>
                    <div style={{marginBottom: 5, float: 'right'}}>
                        {us ?
                            <Button onClick={() => {
                                props.history.push('/bg/LoginBeta')
                                userHelper.clearUser()
                            }
                            } style={{marginLeft: 20, marginRight: 10,}}
                                    size={'small'} rounded={true}>
                                Выйти
                            </Button>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        )
}

export default Menu;