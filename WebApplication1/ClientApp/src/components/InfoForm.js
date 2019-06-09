import React, {Component} from 'react';
import {Link} from "react-router-dom";
import  './TestPage.css'
import  './Infoform.css'
import {Toggle, ToggleOption} from 'rambler-ui/Toggle'
import Radio from "./Radio";
import Arrow from "./Arrow";
import Select from 'rambler-ui/Select'
import {MenuItem} from 'rambler-ui/Menu'
import Button from "rambler-ui/Button";
import Input from 'rambler-ui/Input'

const Month = ['Январь','Февраль', 'Март' ,'Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']

const width = '18%'

class InfoForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state =
            {
                toggleValue: 'Город',
                toggleValue2: 'Мужской',
                toggleValue3: 'Да',
                wher: false,
                day: '',
                Year: '',
                Month: '',
                sex: false,
                work: false,
                age: 1,
                lern: '',
                mail: ''
            }
    }
    onChange = key=> value => {
        this.setState({[key]: value.target.value})
    }
    setValue = key => value => {
        this.setState({
            [key]: value
        })

        console.log(this.state.day)
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

    onChange2 = (e)=>{
        this.setState({lern :e.target.value})
    }

    send = () =>{

        let date = new Date()
        let obj = {
            wher: this.state.toggleValue,
            sex: this.state.toggleValue2,
            work: this.state.toggleValue3,
            lern: this.state.lern,
            age: parseInt(date.getFullYear()-parseInt(this.state.Year)) || 2000
        }

        console.log(obj)

        this.props.result(
            obj
        )


    }


    render() {
        return (
            <div className={"TestPageBody"}>
                <div className={"Wel2"}>
                    <div className={"hpos header"}>О себе</div>
                    <div className={'some center'}  style={{display: 'flex',margin:0,marginBottom: "5%"  }} >
                        <div className={'AlignText some'} style={{width: '45%'}}  >
                    <div className={'marg'}  >
                        Где?
                        <Toggle
                            rounded ={true}
                            value={this.state.toggleValue}
                            className="toggle marg2"
                            onChange={this.onChange('toggleValue')}
                            block={true}
                            equalWidth={true}>
                            <ToggleOption value="Город">Город</ToggleOption>
                            <ToggleOption value="Село">Село</ToggleOption>
                        </Toggle>
                    </div>
                        <div className={'marg'} >
                            Пол
                            <Toggle
                                rounded ={true}
                                value={this.state.toggleValue2}
                                className="toggle marg2"
                                onChange={this.onChange('toggleValue2')}
                                block={true}
                                equalWidth={true}>
                                <ToggleOption value="Мужской">Мужской</ToggleOption>
                                <ToggleOption value="Женский">Женский</ToggleOption>
                            </Toggle>
                        </div>

                        <div className={'marg'} >
                            Работаете
                            <Toggle
                                rounded ={true}
                                value={this.state.toggleValue3}
                                className="toggle marg2"
                                onChange={this.onChange('toggleValue3')}
                                block={true}
                                equalWidth={true}>
                                <ToggleOption value="Да">Да</ToggleOption>
                                <ToggleOption value="Нет">Нет</ToggleOption>
                            </Toggle>
                        </div>
                            </div>
                        <div className={'marg'} className={'AlignText'} style={{width: "45%",margin:0}} >
                           Дата?
                        <div   style={{display: 'flex' }}>
                            <div >
                                <Select

                                    size={'small'}
                                    placeholder="День"
                                    value={this.state.day}
                                    onChange={this.setValue('day')}>
                                    {[...Array(31)].map((item, i) => (
                                        <MenuItem value={i+1} key={i}>
                                            {i+1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>

                            <div >
                                <Select
                                    size={'small'}
                                    placeholder="Месяц"
                                    value={this.state.Month}
                                    onChange={this.setValue('Month')}>
                                    {Month.map((item, i) => (
                                        <MenuItem value={item} key={i}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div >
                                <Select
                                    size={'small'}
                                    placeholder="Год"
                                    value={this.state.Year}
                                    onChange={this.setValue('Year')}>
                                    {[...Array(110)].map((item, i) => (
                                        <MenuItem value={1900+i} key={1900+i}>
                                            {1900+i}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                         </div  >

                            <div className={'marg'} >
                            Место Учебы
                            <Input
                                className={'marg2'}
                                type="text"
                                value={this.state.lern}
                                onChange={this.onChange('lern')}
                                placeholder="Кбип"
                                variation={'regular'}
                                size={'small'}
                                rounded={true}
                            />
                            </div>
                            <div className={'marg'}>
                            E-mail
                            <Input
                                className={'marg2'}
                                type="text"
                                value={this.state.mail}
                                onChange={this.onChange('mail')}
                                placeholder="Examole@mail.com"
                                size={'small'}
                                variation={'regular'}
                                rounded={true}
                            />
                            </div>
                            </div>
                    </div>
                    <div style={ {  marginBottom: "5%",}}>
                        <Button onClick={()=> this.props.prev()}  type={'outline'} size={'small'} rounded={true}>
                            Назад
                        </Button>
                        <Button onClick={this.send}  style={{float:'right' }} size={'small'}  rounded={true}>
                            Начать тест
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export  default InfoForm;