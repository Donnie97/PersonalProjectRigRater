import React, { Component } from 'react';
import '../NavBar/NavBarCSS.css';
import { Link } from 'react-router-dom';
import Icon from './setupIcon3.png';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/user';
import hammenu from './hammenu.png';


class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slide: false
        }
        this.slide = this.slide.bind(this)
    }

    slide() {
        this.setState({
            slide: !this.state.slide
        })
    }

    componentDidMount() {
        this.props.getUserInfo();
    }


    render() {

        return (
            <nav className='wholeNav'>

                <div className='logo'>
                    <Link to='/' className='Links'><img src={Icon} alt='' className='icon' /></Link>
                    <div className='setupText'>Setup</div>
                </div>


                <div className='tabs'>
                    <Link to='/' className='Links'><li className='tabs1 tabs2 box'>Home</li></Link>
                    <Link to='/new' className='Links'><li className='tabs1 tabs2 box'>New</li></Link>
                    <Link to='upload' className='Links'><li className={this.props.user.username ? 'tabs1 tabs2 box' : 'none'}>Upload</li></Link>
                    <Link to='/edit' className='Links'><li className={this.props.user.username ? 'tabs1 tabs2 box' : 'none'}>Edit</li></Link>




                    <a href={process.env.REACT_APP_LOGIN}>
                        <li className={this.props.user.username ? 'tabs1 box loginCreds none' : 'tabs1 box loginCreds'}>Login</li>
                    </a>

                    <div className='columns'>
                        <img className={this.props.user.username ? 'tabs1 box navAvatar' : 'tabs1 box none'} src={this.props.user.img} />
                        <a href={process.env.REACT_APP_LOGOUT}>
                            <li className={this.props.user.username ? 'tabs1 box loginCreds' : 'tabs1 box loginCreds none'}>Logout</li>
                        </a>
                    </div>

                </div>

                <img onClick={this.slide} src={hammenu} alt='' className='hamMenu' />
                <div className={this.state.slide ? 'menu slide' : 'menu'}> 

                    <a className='Links' href={process.env.REACT_APP_LOGIN}>
                        <li className={this.props.user.username ? 'tabs1 none' : 'tabs1'}>Login</li>
                    </a>

                    <div className='center'>
                        <img className={this.props.user.username ? 'tabs1 menuAvatar' : 'tabs1 none'} src={this.props.user.img} />
                    </div>
                    <Link to='/' className='Links'><li className='tabs1'>Home</li></Link>
                    <Link to='/new' className='Links'><li className='tabs1'>Setups</li></Link>
                    <Link to='upload' className='Links'><li className={this.props.user.username ? 'tabs1' : 'tabs1 box loginCreds none'}>Upload</li></Link>
                    <Link to='/edit' className='Links'><li className={this.props.user.username ? 'tabs1' : 'none'}>Edit</li></Link>




                    <a className='Links' href={process.env.REACT_APP_LOGOUT}>
                        <li className={this.props.user.username ? 'tabs1' : 'tabs1 box loginCreds none'}>Logout</li>
                    </a>

                </div>

            </nav>


        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(NavBar);