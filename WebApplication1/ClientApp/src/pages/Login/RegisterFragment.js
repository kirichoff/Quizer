import React, {useState} from 'react';
import Input from "rambler-ui/Input";
import {Toggle, ToggleOption} from "rambler-ui/Toggle";

function RegisterFragment(props) {
    const [type,setType] = useState(false)
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [adminKey,setAdminKey] = useState("")

    return (
        <div>
            {props.type ?
                <>
                </>
                :
                <>

                </>
            }
            <Toggle
                value={type?"ученик":"преподователь"}
                className="toggle marg2"
                onChange={()=>setType(!type)}
                block={true}
                equalWidth={true}>
                <ToggleOption value="ученик">ученик</ToggleOption>
                <ToggleOption value="преподователь">преподователь</ToggleOption>
            </Toggle>
            {type ? <div>№студента/отделение/№группы</div> : <div>Фамилия</div> }
            <Input
                style={{marginBottom: 5}}
                type="email"
                status={!props.testLogin(name) && type? 'error': null}
                autoFocus
                placeholder={''}
                value={name}
                onChange={(e)=> {
                    setName(e.target.value)
                    props.onChange({Login:name,Pass_hash: password,Type: 0},adminKey)
                    }
                }
            />
            <div>пароль</div>
            <Input
                type="password"
                autoFocus
                placeholder={'пароль'}
                value={password}
                onChange={(e)=> {
                    setPassword(e.target.value)
                    props.onChange({Login:name,Pass_hash: password,Type: 0},adminKey)
                }}
            />
            {!type ?
                <>
                    <div>ключ администратора</div>
                    <Input
                        type="text"
                        autoFocus
                        placeholder={'ключ'}
                        value={adminKey}
                        onChange={(e)=>{
                            setAdminKey(e.target.value)
                            props.onChange({Login:name,Pass_hash: password,Type: 0},adminKey)
                        }}
                    />
                </>
                :
                <>
                </>
            }
            <div className={'LnStyle'} onClick={()=> props.toLogin(true)}>
                войти
            </div>
        </div>
    );
}

export default RegisterFragment;