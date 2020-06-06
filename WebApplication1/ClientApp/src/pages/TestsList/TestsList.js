import React, {useEffect, useState} from 'react';
import './TestsList.css'
import {Button} from 'rambler-ui';
import Menu from "../../components/Menu";
import userHelper from "../../utils/userHelper";
import {Link} from "react-router-dom";

function TestsList(props) {

    let user = userHelper.GetUser()
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
    }, [])
    return (
        <div>
            <Menu user={user} {...props} />
            <div style={{marginLeft: '15%'}}>
                <h1 className={'section'}>Ваши Тесты</h1>
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
                            <span> Cоздано: {item.UserAccount.Login}</span>
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
                                       пройдено
                                       </span>

                                   }
                            </span>

                            <div>Максимальное колличесвто баллов: {item.MaxPoints}</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default TestsList;