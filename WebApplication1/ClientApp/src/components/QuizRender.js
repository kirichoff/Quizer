import React, {Component} from 'react';
import TestPage from "./TestPage";

class QuizRender extends Component {
    constructor(){
        super();
        this.state = {reasponse: '' }
    }
    async componentWillMount() {
        //const index = parseInt(this.props.match.params.id, 10) || 0;
        //const reasponse = await fetch(`api/SampleData/Pisun?startDateIndex=${index}`);
        // console.log(reasponse.json())
    }

    render() {

        return (
            <div>
                <div>
                    someeeeeee

                    {this.state.reasponse.DateFormatted}


                <div className={"triangle"}>asd</div>

                </div>

                addada
            </div>
        );
    }
}

export default QuizRender;