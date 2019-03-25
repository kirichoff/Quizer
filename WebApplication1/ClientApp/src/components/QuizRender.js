import React, {Component} from 'react';

class QuizRender extends Component {
    constructor(){
        super();
        this.state = {reasponse: '' }
    }
    componentWillMount(){
        const index = parseInt(this.props.match.params.id, 10) || 0;
        const reasponse = fetch(`api/SampleData/Pisun?startDateIndex=${this.id}`);
        this.state.reasponse = reasponse.json();
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.reasponse.text}
                </div>
            </div>
        );
    }
}

export default QuizRender;