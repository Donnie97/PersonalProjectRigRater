import React, {Component} from 'react';
import axios from 'axios';
import '../PopularPage/PopularCSS.css';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/user';


class Popular extends Component {

    componentDidMount() {
        this.props.getUserInfo();

        axios.get('/api/edit').then(res => {
            this.setState({
                updateStuff: res.data
            })
            console.log(res)
        })
    }

    

    render(){

        return (
            <div>
                <NavBar/>
                <img alt='' src={this.props.user.img}/>
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