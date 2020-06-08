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

            <h3>Добро пожаловать в онлайн-систему тестирования знаний</h3>
            <p><strong></strong></p>
            <h1><strong>KBIP_ExamSystem</strong><span><br /></span></h1>

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