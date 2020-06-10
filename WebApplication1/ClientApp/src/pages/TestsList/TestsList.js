import React, {useEffect, useState} from 'react';
import './TestsList.css'
import {Button} from 'rambler-ui';
import Menu from "../../components/Menu";
import userHelper from "../../utils/userHelper";
import {Link} from "react-router-dom";

function TestsList(props) {

    let user = userHelper.GetUser()
    let [open, setOpen] = useState(null)
    const [reports, setReports] = useState([]);
    const [results, setResults] = useState([])
    let getQuiz = async () => {
        if (user) {
            const url = `api/SampleData/GetQuiz${user.Type === 2 ? 'ByUser?id=' + user.Id : ''}`;
            let response = await fetch(url);
            let json = await response.json()
            setReports(json || []);
        }
    }

    let findTest = (id) => {
        return results.find(k => k.QuizId == id)
    }

    let getResults = async () => {
        if (user) {
            const url = `api/SampleData/GetTestResultByUser?id=${user.Id}`;
            let response = await fetch(url);
            let json = await response.json()
            setResults(json || []);
        }
    }

    useEffect(() => {
        if (user) {
            getQuiz();
            getResults();
        }
    },[])
    console.log('rend tests')
    return (
        <div>
            <Menu user={user} {...props} />
            <div style={{marginLeft: '15%'}}>
                <h1 className={'section'}>Ваши тесты</h1>
                {
                    user && user.Type === 2 ?
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
                    reports.map((item, i) =>
                        <div key={i} className={'repContainer'}>
                            <span className={'repText'}>{item.Header}</span>
                            <span>Cоздано:{item.UserAccount.Login}</span>
                            <span>Максимум баллов: {item.MaxPoints}</span>
                            <span>Вопросов: </span>
                            <span className={'repButton'}>
                                   {
                                       user.Type === 2 ?
                                           <>
                                               <Button onClick={() => {
                                                   const url = `api/SampleData/Delete?id=${item.Id}`;
                                                   fetch(url, {method: "POST"}).then(() => {
                                                       getQuiz()
                                                   });
                                               }}>
                                                   <span style={{fontSize: '10px'}}>удалить</span>
                                               </Button>
                                               <Link to={'/bg2/Results/' + item.Id}>
                                                   <Button style={{marginLeft: 10}}>
                                                       <span style={{fontSize: '10px'}}>Результаты</span>
                                                   </Button>
                                               </Link>
                                               <Link to={'/bg/Admin/' + item.Id}>
                                                   <Button style={{marginLeft: 10}}>
                                                       <span style={{fontSize: '10px'}}>Изменить</span>
                                                   </Button>
                                            </Link>

                                            <Button style={{ marginLeft: 10 }} 
                                                onClick={() => i === open ? setOpen(i) : setOpen(i)}
                                            >
                                                {open === i ? 'Свернуть' : 'Подробнее'}
                                            </Button>
                                        
                                            {
                                                    open === i ?
                                                        item.Answers.map((k, i) =>
                                                            <div style={{ display: 'flex' }} >
                                                                <div style={{ marginRight: '40px', width: '300px' }} >
                                                                    <b>Вопрос:  </b>{k.TestItem.Question}
                                                                </div>
                                               
                                                            </div>
                                                        )
                                                        : null
                                                }
                                           </>
                                           :
                                           !findTest(item.Id)?
                                               <Link to={'/bg/Test/' + item.Id}>
                                                   <Button style={{marginLeft: 10}}>
                                       <span style={{fontSize: '10px'}}>
                                       пройти
                                       </span>
                                                   </Button>
                                               </Link>
                                               :
                                               <span>
                                       ПРОЙДЕНО
                                       </span>

                                   }
                            </span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default TestsList;