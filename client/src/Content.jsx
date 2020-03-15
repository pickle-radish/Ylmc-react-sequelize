import React, {Component} from 'react';

import {Route, HashRouter} from 'react-router-dom';

import Home from './Home';
import ShowList from './ShowList';
import NewMember from './NewMember';
import NewFriends from './NewFriends';
import UpdateMember from './UpdateMember';
import ExpelledList from './ExpelledList';
import Today from './Today';
import ShowGraph from './ShowGraph';
import EditAtt from './EditAtt';

class Content extends Component {
    
  
    render(){
        let managerContent;
     
        if(sessionStorage.getItem('login')!==null){
            managerContent=
                <div>
                    <Route path='/newmember' component={NewMember} />
                    <Route path='/update' component={UpdateMember} />
                    <Route path='/editAtt' component={EditAtt} />
                    <Route path='/today' component={Today} />
                </div>
        }

        return (
            <div id="content">
                <HashRouter>
                    <Route exact path='/home' component={Home}/>
                    <Route path='/list' component={ShowList} />
                    <Route path='/newList' component={NewFriends} />
                    <Route path='/expelledMember' component={ExpelledList} />
                    <Route path='/showgraph' component={ShowGraph} />
                    {managerContent}
                </HashRouter>

            </div>

        )
    }
}

export default Content;