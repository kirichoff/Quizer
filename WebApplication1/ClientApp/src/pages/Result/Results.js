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
        data = data || []
        setResults(data)
        if(data.length) {
            getDoc({
                title: `Отчет о тесте: "${data[0].QuizHeader}"`,
                description: '',
                headers: ['Ученик', 'Количество Балов'],
                body: [...body(data)]
            }).then(r => setDocx(r))
        }
    }

    let total = (array) => {
        let sum = 0;
        for (let item of array) {
            sum += forQuestion(item.Answer, item.TestItem.Questions)
        }
        return sum;
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
        return data.map(k => [k.UserTest.Login, total(k.Answers).toString()])
    }

    console.log(results)
    return (
        <div>
            <Menu user={user} {...props} />
            <div style={{marginLeft: '15%'}}>
                <h1 className={'section'}>результаты</h1>
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
                            <span style={{fontSize: '10px'}}>Получить docx отчет</span>
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
                                    {open === i ? 'свернуть' : 'разверунть'}
                                </Button>
                            </div>
                            {
                                open === i ?
                                    item.Answers.map((k, i) =>
                                        <div>
                                            <div>{k.TestItem.Question}</div>
                                            <div>Баллов: {forQuestion(k.Answer, k.TestItem.Questions)}</div>
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