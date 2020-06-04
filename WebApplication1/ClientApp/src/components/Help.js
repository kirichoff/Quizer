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
                            <h2><strong>Правила пользования системой тестирования:</strong></h2>
                            <ul>
                                <li>Тест используется в первую очередь для проверки ваших знаний, опыта, продуктивности и техники принятия решений;</li>
                                <li>Вы в праве использовать доступные вам ресурсы (Visual Studio и др.);</li>
                                <li>Вам запрещено использовать интернет или другие устройства с выходом в сеть;</li>
                                <li>Одну тестовую работу можно пройти только <strong>один раз</strong>;</li>
                                <li>Результаты сохраняются автоматически после ответа на последний вопрос и нажатие на кнопку <strong>"Далее"</strong>.</li>
                            </ul>
                            <h2><br /><strong>Подсказки:</strong></h2>
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
                                Какая-то инструкция
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