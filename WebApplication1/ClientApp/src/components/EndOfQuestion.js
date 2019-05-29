import React, {Component} from 'react';

class EndOfQuestion extends Component {
    render() {
        return (
            <div>
            <div style={{borderRadius: "20px",overflow: "hidden"}}>
                {this.props.Questions.map((k,i)=>{
                    return(<div  key={i} className={'end'} style={ (this.props.answer[i].answer >0)? {backgroundColor: '#96ff63'} : {backgroundColor: '#ff6d5c'} } >
                        <div className={'answer'} style={{cursor:'pointer'}} > {k.Question} { (this.props.answer[i].answer>0 )? 'Верно': 'неверно' } </div>
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