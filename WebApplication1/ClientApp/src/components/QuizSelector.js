import React, {Component} from 'react';
import QuizCard from "./QuizCard";

class QuizSelector extends Component {
    render() {
        return (
            <div className={"Page"}>
            <QuizCard text={"sometext"}
                    id = {1}
            />
                <QuizCard text={"sometext"}
                          id = {1}
                />


            </div>
        );
    }
}

export default QuizSelector;