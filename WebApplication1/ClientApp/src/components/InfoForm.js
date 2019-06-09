import React, {Component} from 'react';
import {Link} from "react-router-dom";
import  './TestPage.css'
import  './Infoform.css'
import {Toggle, ToggleOption} from 'rambler-ui/Toggle'
import Radio from "./Radio";
import Arrow from "./Arrow";
import Button from "rambler-ui/Button";

class InfoForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state =
            {
                toggleValue: 'Rambler',
                toggleValue2: 'Мужской',
                toggleValue3: 'Да',
                wher: false,
                sex: false,
                work: false,
                age: 1,
                lern: ''
            }
    }


    change = (r1, r2, name) => {
        console.log(this.state.age)
        switch (name) {
            case 'Место проживания' :
                if (r1) this.setState({wher: true}); else this.setState({wher: false});
                break;
            case 'Работаете?' :
                if (r1) this.setState({work: true}); else this.setState({whork: false});
                break;
            case 'Пол' :
                if (r1) this.setState({sex: true}); else this.setState({sex: false});
                break;
        }
    }

    componentDidMount() {
        console.log('goodby')
    }

    render() {
        return (
            <div className={"TestPageBody"}>
                <div className={"Wel2"}>
                    <div className={"hpos header"}>О себе</div>
                    <div>
                    <div>
                        Где?
                        <Toggle
                            rounded ={true}
                            value={this.state.toggleValue}
                            className="toggle"
                            onChange={this.onChange}
                            block={true}
                            equalWidth={true}>
                            <ToggleOption value="Rambler">Город</ToggleOption>
                            <ToggleOption value="Yandex">Село</ToggleOption>
                        </Toggle>
                    </div>
                        <div>
                            Пол
                            <Toggle
                                rounded ={true}
                                value={this.state.toggleValue2}
                                className="toggle"
                                onChange={this.onChange}
                                block={true}
                                equalWidth={true}>
                                <ToggleOption value="Мужской">Мужской</ToggleOption>
                                <ToggleOption value="Женский">Женский</ToggleOption>
                            </Toggle>
                        </div>

                        <div>
                            Работаете
                            <Toggle
                                rounded ={true}
                                value={this.state.toggleValue3}
                                className="toggle"
                                onChange={this.onChange}
                                block={true}
                                equalWidth={true}>
                                <ToggleOption value="Да">Да</ToggleOption>
                                <ToggleOption value="Нет">Нет</ToggleOption>
                            </Toggle>
                        </div>
                        <div>
                            Дата рождения
                        </div>
                    </div>
                    <div style={ {  marginBottom: "5%",}}>
                        <Button onClick={()=> this.props.prev()}  type={'outline'} size={'small'} rounded={true}>
                            Назад
                        </Button>
                        <Button onClick={()=> this.props.result()}  style={{float:'right' }} size={'small'}  rounded={true}>
                            Начать тест
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export  default InfoForm;