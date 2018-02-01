import React, {Component} from 'react';
import axios from  'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/user';
import './NewPageCSS.css';
import NavBar from '../NavBar/NavBar';

class New extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        this.props.getUserInfo()

        axios.get('/api/final').then(res => {
                console.log(res)
            })
        }

    render(){
        return (
            <div className='center'>
                <NavBar/>
                <div className='newInnerBody'>

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

export default connect(mapStateToProps, {getUserInfo})(New);