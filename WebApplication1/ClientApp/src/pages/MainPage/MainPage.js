import React from 'react';
import './MainPage.css'
import Menu from "../../components/Menu";
import userHelper from "../../utils/userHelper";
import Link from "react-router-dom/Link";

function MainPage(props) {
    let user = userHelper.GetUser()

    return (<div>
        <Menu user={user} {...props} />
            <div className={'bg-main'}>

                <Link to={'/bg/LoginBeta'}>
                    Войти
                </Link>


            </div>
        </div>
    );
}

export default MainPage;