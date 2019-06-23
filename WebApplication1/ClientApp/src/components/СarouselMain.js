import React, {Component} from 'react';
import Button from "rambler-ui/Button";

class CarouselMain extends Component {
    render() {
        return (
                <div>
                    <div className={'discr'} style={
                        {marginLeft: '14%',
                            marginBottom: "2%"
                            ,height: '60vh', width: '72vw',borderRadius: 20 }}
                    > <h1>Привет мир!</h1>
                        <p  style={{paddingRight: "40%",fontSize: '2.1vh' }}>
                            Наконецто сайт  работает с некоотрыми
                            нюансами но все же ;) и вот вам немного воды:
                            выстроенный бесконечный канон с полизеркальной векторно-голосовой
                            структурой,Соноропериод, в первом приближении, имеет миксолидийский алеаторически
                        </p>
                        {/*<Button style={{color: "#ffff",marginTop: "1vh" }} size={"small"} type={'primary'} rounded={true}>*/}
                        {/*    Read more*/}
                        {/*</Button>*/}
                    </div>
                    <img src={'../marc-kargel-1621473-unsplash.jpg'} style={
                        {marginLeft: '14%',
                            filter: 'brightness(0.6)',
                            marginBottom: "2%"
                            ,height: '60vh', width: '72vw',borderRadius: 20 }}/>
                </div>
        );
    }
}

export default CarouselMain;