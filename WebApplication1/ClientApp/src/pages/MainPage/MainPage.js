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

                <Link to={'/bg/LoginBeta'}>
                    Войти
                </Link>

                <Link to={'/bg/LoginBeta'}>
                    <Button>
                        Войти
                    </Button>
                </Link>

                <div>Добро ПОжаловать</div>

            </div>
        </div>
    );
}

export default MainPage;