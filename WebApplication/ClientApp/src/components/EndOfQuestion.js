import React, {Component} from 'react';

class EndOfQuestion extends Component {

    constructor(props, context) {
        super(props, context);
        this.state ={
            Stat: []
        }
    }

    componentWillMount() {
        this.getStats()
    }

    getStats(){
        let location = window.location.href.split('/')
       let id = location[location.length-1]
        const url = `api/SampleData/GetStatsOfQuestion?id=${id}`
        fetch(url,{method: 'GET'})
            .then((response)=> {
                console.log("respnse: ")
                response.json().then(val=>
                    this.setState({Stat: val})
                )
            })
            .catch( (e) => console.log("exeption",e))

    }

    render() {
        return (
            <div>
            <div style={{borderRadius: "20px",overflow: "hidden"}}>
                {this.props.Questions.map((k,i)=>{
                    return(<div  key={i} className={'end'} style={ (this.props.answer[i].answer >= 0)? {backgroundColor: '#96ff63'} : {backgroundColor: '#ff6d5c'} } >
                        <div className={'answer'} style={{cursor:'pointer'}} > {k.Question} {Math.round(this.state.Stat[i],2)}%</div>
                    </div>)
                    }
                )}
            </div>
                <div className={'answer'}>{this.props.trueCounter}/{this.props.Questions.length}</div>
            </div>
        );
    }
}

export default EndOfQuestion;