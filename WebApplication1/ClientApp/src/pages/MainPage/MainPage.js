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
                        <h1> Добро пожаловать в онлайн систему тестирования KBIP_ExamSystem.</h1>
           
            <Link to={'/bg/LoginBeta'}>

                         <Button>
                             Войти
                         </Button>
                      </Link>
                </div>
            </div>
    );
}

export default MainPage;