import React, {Component} from 'react';
import InfoForm from "./InfoForm";

class User extends Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (


            <div>


                <InfoForm/>

                <div>name</div>
                {"Vlaer"}
                <div>Your Test</div>



            </div>
        );
    }
}

export default User;