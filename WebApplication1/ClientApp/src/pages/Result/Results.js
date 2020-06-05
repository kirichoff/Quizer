import React, {useEffect, useState} from 'react';
import './resultstyle.css'
import Menu from "../../components/Menu";
import userHelper from "../../utils/userHelper";
import {Button} from "rambler-ui";
import getDoc from "../../utils/docxGenerator";

function Results(props) {

    let [results, setResults] = useState([])
    let [open, setOpen] = useState(null)
    let [docx, setDocx] = useState(null)
    useEffect(() => {
        getResults()
    }, [])

    let getResults = async () => {
        let loc = props.match.params.id
        let res = await fetch('/api/SampleData/GetTestResults?id=' + loc)
        let data = await res.json()
        let test = await (await fetch('api/SampleData/GetQuizById?id='+loc)).json()
        data = data || []
        setResults(data)
        if(data.length) {
            getDoc({
                title: `"${data[0].QuizHeader}"`,
                info: {user: test.UserAccount.Login,count: test.Items.length, points: test.MaxPoints},
                description: '',
                headers: ['Учащийся', 'Количество Балов','Количество правильных ответов'],
                body: [...body(data)]
            }).then(r => setDocx(r))
        }
    }

    let total = (array) => {
        let sum = 0;
        let count = 0;
        for (let item of array) {
            if(forQuestion(item.Answer, item.TestItem.Questions)){
                sum += forQuestion(item.Answer, item.TestItem.Questions)
                count++;
            }

        }
        return [sum,count];
    }


    let forQuestion = (arr1, arr2) => {
        let sum = 0
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i]) {
                sum += arr2[i].Point
            }
        }
        return sum;
    }

    let user = userHelper.GetUser();
    console.log('results', results)

    const body = (data) => {
        return data.map(k => [k.UserTest.Login, total(k.Answers)[0].toString(),total(k.Answers)[1].toString()])
    }

    console.log(results)
    return (
        <div>
            <Menu user={user} {...props} />
            <div style={{marginLeft: '15%'}}>
                <h1 className={'section'}>Результаты</h1>
                {
                    results && results.length > 0 ?
                        <Button style={{marginLeft: 10}}
                                container={
                                    <a
                                        download={'otchet.docx'}
                                        href={"data:application/msword;base64," + docx
                                        }
                                    >
                                    </a>
                                }
                        >
                            <span style={{fontSize: '10px'}}>Скачать отчет с результатами тестирования</span>
                        </Button>
                        :
                        null
                }
                {results.map((item, i) => {
                    return (
                        <div key={i}>
                            <div className={'repContainer'}>
                                <span className={'repText'}>
                                    <div>
                                    Ученик:
                                    <span style={{
                                        fontFamily: 'Roboto',
                                        fontWeight: 300
                                    }}>
                                        {item.UserTest.Login}
                                </span>
                                        </div>
                                    <div>
                                    всего:
                                    <span style={{
                                        fontFamily: 'Roboto',
                                        fontWeight: 300
                                    }}>
                                        {total(item.Answers)}
                                </span>
                                        </div>
                                </span>
                                <Button type={'outline'}
                                        onClick={() => i === open ? setOpen(null) : setOpen(i)}
                                >
                                    {open === i ? 'Свернуть' : 'Разверунть'}
                                </Button>
                            </div>
                            {
                                open === i ?
                                    item.Answers.map((k, i) =>
                                        <div style={{display: 'flex'}} >
                                            <div style={{marginRight: '40px',width: '300px'}} >
                                                <b>Вопрос:</b>{k.TestItem.Question}
                                            </div>
                                            <div>
                                                <b>Баллов:</b> {forQuestion(k.Answer, k.TestItem.Questions)}
                                            </div>
                                        </div>
                                    )
                                    : null
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Results;