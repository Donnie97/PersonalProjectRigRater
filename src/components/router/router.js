import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NavBar from '../NavBar/NavBar';
import Popular from '../PopularPage/Popular';
import New from '../NewPage/NewPage';
import Upload from '../UploadPage/upload'

class Routing extends Component {
    render(){
        return (
            <div>
                <Switch>
                    <Route path='/' component={HomePage} exact/>
                    <Route path='/navbar' component={NavBar}/>
                    <Route path='/popular' component={Popular}/>
                    <Route path='/new' component={New}/>
                    <Route path='/upload' component={Upload}/>
                </Switch>
            </div>
        )
    }
}

export default Routing;