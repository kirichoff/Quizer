import React, {useEffect, useState} from 'react';
import './TestsList.css'
import {Button} from 'rambler-ui';
import Menu from "../../components/Menu";
import userHelper from "../../utils/userHelper";
import {Link} from "react-router-dom";

function TestsList(props) {

    let user = userHelper.GetUser()
    const [reports,setReports] = useState([]);

    let getQuiz = async () => {
        const url = `api/SampleData/GetQuiz`;
        let response = await fetch(url);
        let json = await response.json()
        setReports(json || []);
    }

    useEffect( ()=>{
        getQuiz()
    },[reports.length])

    console.log('Test', reports)
    return (
        <div>
            <Menu user={user} {...props} />
            <div style={{marginLeft: '15%'}}>
                <h1 className={'section'}>Ваши Тесты</h1>
                {
                    user.Type === 2?
                        <Link to={'/bg/Admin/'}>
                        <Button
                            style={{marginLeft: '38%'}}
                        >
                            <span style={{fontSize: '10px'}}>
                                добавить
                            </span>
                        </Button>
                        </Link>
                        :
                        null
                }
                {
                    reports.map((item,i) =>
                        <div key={i}  className={'repContainer'}>
                            <span className={'repText'}>{item.Header}</span>
                            <span className={'repButton'}>
                                   {
                                       user.Type === 2?                                                                    
                                           <Button onClick={() => {
                                               const url = `api/SampleData/Delete?id=${item.Id}`;
                                               fetch(url, {method: "POST"}).then(() => {
                                                   getQuiz()
                                               });
                                           }}>
                                               <span style={{fontSize: '10px'}}>удалить</span>
                                           </Button>
                                           :
                                           null
                                        }

                                           <Link to={'/bg2/Results/' + item.Id}>
                                               <Button style={{marginLeft: 10}}>
                                                   <span style={{fontSize: '10px'}}>Результаты</span>
                                               </Button>
                                            </Link>            
                                <Link to={'/bg/Test/'+item.Id}>
                                       <Button style={{marginLeft: 10}}>
                                       <span style={{fontSize: '10px'}}>пройти</span>
                                       </Button>
                                       </Link>
                            </span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default TestsList;