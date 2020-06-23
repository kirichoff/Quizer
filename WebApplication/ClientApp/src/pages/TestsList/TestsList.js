import React, {useEffect, useState} from 'react';
import './TestsList.css'
import {Button} from 'rambler-ui';
import Menu from "../../components/Menu";
import userHelper from "../../utils/userHelper";
import {  Link  } from "react-router-dom";
import Input from "rambler-ui/Input";

function TestsList(props) {

    let user = userHelper.GetUser()
    const [reports, setReports] = useState([]);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');
    const [filted, setFilted] = useState([]);
    const [open, setOpen] = useState(null);


    let getQuiz = async () => {
        if (user) {
            const url = `api/SampleData/GetQuiz${user.Type === 2 ? 'ByUser?id=' + user.Id : ''}`;
            let response = await fetch(url);
            let json = await response.json()
            setReports(json || []);
            setFilted(json || []);
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

            <Input
            style={{ width: '83%', marginBottom: 5}}
            value={search}
            placeholder={'Поиск'}
            onChange={(e) => {
                if (e.target.value != '') {
                    setFilted(
                        reports.filter(it => it.Header.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
                        )
                    )
                } else {
                    setFilted(reports)
                }
                setSearch(e.target.value)
            }
            }
            />
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
                    filted.map((item, i) =>
                        <div key={i}>
                        <div  className={'repContainer'}>
                                <span style={{ width:'400px!important' }} className={'repText rep2'}>
                                <div>{item.Header}
                                </div>
                                <div style={{ fontSize: 14 }}>Cоздано:{item.UserAccount.Login}</div>
                            </span>

                            <span style={{width: 180}}>Максимум баллов: {item.MaxPoints}</span>
                            <span style={{width: 150}}>Вопросов: {item.Items.length} </span>
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
                                                        onClick={() => i === open ? setOpen(null) : setOpen(i)}
                                                    >
                                                        {open === i ? 'Свернуть' : 'Подробнее'}
                                                    </Button> 
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
                    {
                        open === i ?
                        item.Items.map((k, i) =>
                    <div key= {i} style={{ display: 'flex' }} >
                    <div style={{ marginRight: '40px', width: '72%',marginBottom: 15 }} >
                    <b>Вопрос:  </b>{k.Question}
                        </div>
                                <div>
                                <b>Ценность:  </b>
                                    {(() =>
                                                    {
                                        console.log(k)
                                        let sum = 0;
                                        for (let it of k.Questions) {
                                            sum += it.Point;
                                        }
                                        return sum;
                    })()
                    }
                        </div>
                        </div>
                    )
                    : null
                    }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        );
}

export default TestsList;