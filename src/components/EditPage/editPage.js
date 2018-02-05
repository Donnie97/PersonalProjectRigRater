import React, {Component} from 'react';
import axios from 'axios';
import './editPage.css'
import '../NewPage/NewPageCSS.css';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/user';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Rater from 'react-rater-plus';

const styles = {
    headline: {
        backgroundColor: '#1d1d1d',
        zIndex: '-100',
    },
    color: {
        color: 'white',
    },
    slide: {
        padding: 10,
    },
};


class Popular extends Component {

    constructor(props) {
        super(props);

        this.state= {
            slideIndex: 0,
            id: this.props.user.auth_id,
            computerStuff: []
        }
    }

    componentDidMount() {
        this.props.getUserInfo();

        axios.get('/api/edit').then(res => {
            this.setState({
                computerStuff: res.data
                
            })
            console.log(res)
        })
    }

    onpress(i) {
        const id = this.state.computerStuff[i].hardwareid
        const hardware_id = {id: id}

        axios.post('/api/delete', hardware_id).then(res => {
            console.log(res)
        })
    }

    handleChange = (val) => {
        this.setState({
            slideIndex: val
        })
    }

    render(){
    
        const info = this.state.computerStuff.map((e, i) => {
            return (
                <div>
                            <div className='outerIconImage'>
                                <img src={e.img} alt='Profile Pic' className='profileShowcasePic'></img>
                            
                            <p className='titleSetup'>{e.titlename}</p>
                            
                            </div>
                    <div className='newCenter'>
                        <div className='widths'>
                            <div className='newInnerBody'>
                            <img src={e.image} alt='Computer Setup' className='showcaseImages'></img>

                            </div>
                        </div>

                    </div>

                    <div className='MUtabs'>
                        <Tabs
                            style={styles.headline}
                            tabItemContainerStyle={styles.headline}
                            onChange={this.handleChange}
                            value={this.state.slideIndex}
                        >
                            <Tab style={styles.color} label="Hardware" value={0} />
                            <Tab style={styles.color} label="Peripherals" value={1} />
                        </Tabs>
                        <SwipeableViews
                            index={this.state.slideIndex}
                            onChangeIndex={this.handleChange}
                        >
                            <div className='viewsBox'>
                                <h2 className='headline'>GPU: {e.gpu}
                                                        <br />
                                                        Motherboard: {e.motherboard}
                                                        <br />
                                                        Processor: {e.processor}
                                                        <br />
                                                        Case: {e.compcase}
                                                        <br/>
                                                        Power Supply: {e.powersupply}
                                                        <br />
                                                        
                                </h2>
                            </div>
                            <div className='headline'>  Mouse: {e.mice}
                                                        <br />
                                                        Keyboard: {e.keyboard}
                                                        <br />
                                                        Headset: {e.headset}
                                                        <br />
                                                        Microhone: {e.microphone}
                                                        <br />
                                                        Mousepad: {e.mousepad}
                                                        <br />
                                                        Monitor: {e.monitor}
                            </div>
                        </SwipeableViews>

                    </div>
                    <div className='center'>
                    <button onClick={() => this.onpress(i)} className='deleteButton'>DELETE</button>
                    </div>
                </div>
            )
        })


        return (
            <div>
                <NavBar/>
                <div className='padding'>
                {info}
                </div>
            </div>
        ) 
    }
} 

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect( mapStateToProps, { getUserInfo })(Popular);