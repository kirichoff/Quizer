import React, {Component} from 'react';
import {Link} from "react-router-dom";
import  './TestPage.css'
import  './Infoform.css'
import Radio from "./Radio";

class InfoForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state =
            {
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
            <div className={"center"}>
                <div className={"Welcome"}>
                    <span className={"header"}>О себе</span>
                    <div className="pad">
                        <div onClick={()=> this.props.result({
                            wher:this.state.wher,
                            sex: this.state.sex,
                            work: this.state.work,
                            age: this.state.age,
                            lern: this.state.lern}) }
                             className={"arrow"}>
                            Стрелка вправо
                        </div>
                    </div>
                    <div>
                        <Radio val1={'Город'} val2={'Село'} onchange={this.change}>Место проживания</Radio>
                        <Radio val1={'Да'} val2={'Нет'} onchange={this.change}>Работаете?</Radio>
                        <Radio val1={'Да'} val2={'Нет'} onchange={this.change}>Пол</Radio>
                        <div className={"discripton"}>Возраст</div>
                        <input type={'number'} onChange={(e) => this.setState({age: e.currentTarget.value})}/>
                        <div className={"discripton"}>Образование</div>
                        <input type={'text'} onChange={(e) => this.setState({lern: e.currentTarget.value})}/>
                    </div>
                </div>
            </div>
        );
    }
}

export  default InfoForm;