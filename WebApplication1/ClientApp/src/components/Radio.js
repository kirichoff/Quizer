import React, {Component} from 'react';
import './Infoform.css'
import './TestPage.css'
class Radio extends Component {
    constructor() {
        super();
        this.state = {

            r1: true,
            r2: false,
            clas1: 'cl',
            clas2: 'rad'
        }
    }

    cl = (e)=>{
        this.props.onchange(this.state.r1,this.state.r2,this.props.children);
        if(e.currentTarget.id == 1) {
            this.setState({r1: true,r2: false, clas1: 'cl',clas2: 'rad'} )
        }
        else {
            this.setState({r1: false,r2: true, clas1: 'rad',clas2: 'cl'} )
        }
    }
    render() {
        return (
            <div>
                <div className={"discripton"} >{this.props.children}</div>
                <span onClick={this.cl} id={1} className={this.state.clas1 }>{this.props.val1}</span>
                <span onClick={this.cl} id={2} className={this.state.clas2}>{this.props.val2}</span>
            </div>
        );
    }
}

export default Radio;