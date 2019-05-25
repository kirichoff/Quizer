import React, {Component} from 'react';

class EndOfQuestion extends Component {
    render() {

        function rightCount(ans){
            let counter =0;
            ans.map(k=>{
                if( k === 'true' )
                    counter++;
            }  )
            return counter;
        }
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
                <div className={'answer'}>{rightCount(this.props.answer)}/{this.props.Questions.length}</div>
            </div>
        );
    }
}

export default EndOfQuestion;