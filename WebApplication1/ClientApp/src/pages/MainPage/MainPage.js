import React from 'react';
import './MainPage.css'
import Menu from "../../components/Menu";
import userHelper from "../../utils/userHelper";
import Link from "react-router-dom/Link";
import Button from "rambler-ui/Button";

function MainPage(props) {
    let user = userHelper.GetUser()

    return (<div>
                <Menu user={user} {...props} />
        <div className={'bg-main'}>
            <div className={'kbp-logo'}>
                
            </div>
            <div>
                <h3>Добро пожаловать в онлайн-систему тестирования знаний</h3>
            </div>
            <div>
                <h1><strong>KBIP_ExamSystem!</strong><span><br /></span></h1>
            </div>
            {!user ?
                <div className={'home-container'} >
                    <Link style={{ marginRight: '30px' }} to={'/bg/LoginBeta'}>
                        <div className={'space'}>

                        </div>
                        <div>
                <Button>
                                Войти
                         </Button>
                            </div>
                    </Link>     
                    <div>
                    <Link to={'/bg/LoginBeta'}>
                        <div>
                <Button>
                                Зарегистрироваться
                          </Button>
                            </div>
            </Link>
                    </div>
                    </div>
                
             :
            null
            }
        </div>
            </div>
    );
}

export default MainPage;