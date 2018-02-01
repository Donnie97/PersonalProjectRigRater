import React, {Component} from 'react';
import '../HomePage/HomePageCSS.css';
import NavBar from '../NavBar/NavBar';
import Icon from '../NavBar/setupIconCloud.png'
import SetupPic from '../NavBar/setupIcon3.png'

class HomePage extends Component {
    render(){
        return (
    <div className='homeBG'>
        <NavBar/>
            <div className='hiddenBlock'>
            </div>
        

            <div className='middlePic'>
            <img src={SetupPic} alt='' className='setupPic'/>
            <br></br>
            <div className='setupTextHome'>
            SETUP
            </div>
            </div>

            {/* <img src={Icon} alt='' className='icon2'/> */}

            {/* <div className='frontBlock'>
                Setup
                </div>
                <div className='homeMiddleBG'>
            </div>*/}
    </div>
            
        )
    }
}

export default HomePage;