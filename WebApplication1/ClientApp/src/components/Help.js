import React, {Component} from 'react';
import Menu from "./Menu";
import {Tabs, TabsItem} from 'rambler-ui/Tabs'
import userHelper from "../utils/userHelper";
const values = ['Учащемуся', 'Преподавателю']


class Help extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: values[0]
        }
    }
    handleChange = (event, value) => {
        this.setState({value})
    }

    render() {
        let user = userHelper.GetUser()
        return (
            <div>
                <Menu user = {user} {...this.props} />

                <div style={{marginBottom: '50%' }} >

                    <div style={{paddingLeft: '38vw'}} >
                    <h3 style={{marginLeft: '11%'}} >Помощь</h3>
                    <Tabs  value={this.state.value} onChange={this.handleChange}>
                        {values.map((item, index) => (
                            <TabsItem
                                value={item}
                                key={index}
                                className="customTabsItemClassName">
                                {item}
                            </TabsItem>
                        ))}
                    </Tabs>
                    </div>
                    {(this.state.value === 'Учащемуся') ?
                        <div style={{paddingLeft: '20%',paddingRight: '20%' }}>
                          <h4 style={{marginLeft: '28%'}} >Краткая справка для учеников</h4>
                            <h1>Добро пожаловать в онлайн систему тестирования KBIP_ExamSystem.</h1>
                            <p><br />Чтобы зарегистрироваться в базе учащихся - вам необходимо перейти во вкладку <strong>Регистрация--&gt;Ученик</strong> и заполнить поля, представленные ниже.<br />Логином у учеников служит их номер в журнале, буква отделения и номер группы. Пример: "<span>3Т691</span>", "<span>22П982</span>" и т.д.</p>
                            <p>Пройдя авторизацию как учащийся колледжа, вам станет доступна функция <strong>выполнения</strong> тестовой работы.</p>
                            <h2>Правила пользования системой тестирования:</h2>
                            <ul>
                                <li>Тест используется в первую очередь для проверки ваших знаний, опыта, продуктивности и техники принятия решений;</li>
                                <li>Вы в праве использовать доступные вам ресурсы (Visual Studio и др.);</li>
                                <li>Вам запрещено использовать интернет или другие устройства с выходом в сеть;</li>
                                <li>Одну тестовую работу можно пройти только <strong>один раз</strong>;</li>
                                <li>Результаты сохраняются автоматически после ответа на последний вопрос и нажатия на кнопку следующего вопроса <strong>"(>)"</strong>.</li>
                            </ul>
                            <h4><strong>Подсказки:</strong></h4>
                            <ul>
                                <li>Не торопитесь, отвечая на вопрос. У вас есть возможность <span>просмотреть все вопросы</span>, пролистывая их вперед или назад;</li>
                                <li>Отвечайте уверенно, ведь <span>сменить вариант ответа на правильный уже не получится</span>;</li>
                                <li>Над вариантами ответа указано количество правильных вариантов, будьте внимательны.</li>
                            </ul>
                        </div>
                        :
                        <div style={{paddingLeft: '20%',paddingRight: '20%' }}>
                            <h4 style={{marginLeft: '28%'}} >Краткая справка для преподавателей</h4>
                            <p>
                                <h1>Добро пожаловать в онлайн систему тестирования KBIP_ExamSystem.</h1>
                                <p>Чтобы зарегистрироваться в базе учителей - вам необходимо перейти во вкладку Регистрация--&gt;Преподаватель и заполнить поля, представленные ниже.<br />Логином у преподавателей служит их Фамилия и И.О. Пример: "Иванов И.И.". Помимо пароля, чтобы зарегистрировать аккаунт с правами администратора, <br />вам нужно ввести ключ администратора, доступный только преподавательскому составу.</p>
                                <h4>Пройдя авторизацию как преподаватель колледжа, вам доступны такие функции, как:</h4>
                                <ul>
                                    <li>Просмотр уже созданных вами ранее тестовых работ;</li>
                                    <li>Добавление новых тестов;</li>
                                    <li>Удаление неактульных или неверно созданных тестов;</li>
                                    <li>Просмотр перечня результатов по каждому из тестов, со статиской прохождения его каждым учащимся.</li>
                                </ul>
                                <h2><br />Как создать тест?</h2>
                                <p>Вы можете создать новый тест, нажв на кнопку "ДОБАВИТЬ". После этого откроется страница редактирования тестовой работы.<br />На ней вы можете задать название теста ("Заголовок") и максимальное количество баллов за прохождение теста.</p>
                                <h2><br />Как заполнить тест вопросами?</h2>
                                <p>После задания необходимых параметров вы перейдете на страницу с созданием, непосредственно, вопросов. <br />На панели слева укажите "Содержание вопроса", а на панели справа - впишите все возможные варианты ответа (в поле "&lt;вариант&gt;"), на этот вопрос.<br />После этого выберите правильный вариант ответа (или несколько, если вопрос подразумевает это), кликнув на пустой квадратик слева от варианта (он должен стать "зеленым").<br />Выбрав правильный вариант ответа необходимо задать ему "ценность". <br />На счетчике справа от правильного варианта укажите количество баллов, которое пойдет в зачет ученику, если тот выберет его.</p>
                                <p></p>
                                <h2>Как просмотреть результаты тестирования?</h2>
                                <p>Чтобы просмотреть результаты тестирования по каждому из тестовых работ, созданных вами, вам необходимо перейти на страницу "Список тестов",<br />выбрать нужный вам тест и нажать на кнопку "РЕЗУЛЬТАТЫ". После этого вам станут доступны для просмотра результаты тестирования по каждому<br />учащемуся, прошедшему этот тест. <br />Вы также можете скачать отчет со всеми результатами (непосредственно по этому тесту), нажав на соответствующую кнопку под заголовком "Результаты".</p>
                                <p></p>
                                <h4><strong>Подсказки:</strong></h4>
                                <ul>
                                    <li>Чтобы удалить лишний вариант ответа - нажмите на "X" справа от него.</li>
                                    <li>Программа в онлайн-режиме подсчитывает количество баллов, которые были распределены между вопросами, вы можете следить за этим в нижней части экрана.</li>
                                </ul>
                            </p>
                        </div>
                    }
                </div>
                <div className={'footer'} >  </div>
            </div>
        );
    }
}

export default Help;