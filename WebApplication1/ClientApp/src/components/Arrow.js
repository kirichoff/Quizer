import React, {Component} from 'react';
import './arrow.css'
class Arrow extends Component {
    render() {

        function  sw(val){
            console.log(val)
            switch ( '' || val) {
                case 'right': return 'rotate(-90deg)' ;
                case 'left':return 'rotate(90deg)' ;
                case 'top':return 'rotate(-180deg)' ;
                case 'bottom':return 'rotate(360deg)' ;
                default: return  'rotate(-90deg)';
            }
        }

        return (
            <div >
                <svg style={{transform: sw(this.props.rotate)}} id='Слой_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
                    <linearGradient id='SVGID_1_' gradientUnits='userSpaceOnUse' x1='0.5'
                                    y1='102' x2='199.5' y2='102'>
                        <stop offset='0.221' stopColor='red' />
                        <stop offset='0.444' stopColor='#00f' />
                        <stop offset='0.734' stopColor='#3000cf' />
                    </linearGradient>

                        <linearGradient id='SVGID_2_' gradientUnits='userSpaceOnUse' x1='0.5'
                                        y1='102' x2='199.5' y2='102'>
                            <stop offset='0.221' stopColor='white' />
                            <stop offset='0.444' stopColor='white' />
                            <stop offset='0.734' stopColor='white' />
                        </linearGradient>

                    <path className='st0'
                          strokeWidth={'3'}
                          strokeMiterlimit={10}
                          d='M4.16,44.3c-5.55-8.39,0.23-19.8,10.03-19.8H100h85.81c9.8,0,15.58,11.41,10.03,19.8l-85.81,129.72c-4.83,7.31-15.22,7.31-20.05,0L4.16,44.3z'>
                    </path>
                </svg>
            </div>
        );
    }
}

export default Arrow;