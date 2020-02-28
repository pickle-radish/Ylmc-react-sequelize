import React, {Component} from 'react';

import {Route, HashRouter} from 'react-router-dom';

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

        return (
            <div id="content">
                <HashRouter>
                    <Route exact path='/' />
                    <Route path='/list' component={ShowList} />
                    <Route path='/newmember' component={NewMember} />
                    <Route path='/newList' component={NewFriends} />
                    <Route path='/update' component={UpdateMember} />
                    <Route path='/expelledMember' component={ExpelledList} />
                    <Route path='/today' component={Today} />
                    <Route path='/showgraph' component={ShowGraph} />
                    <Route path='/editAtt' component={EditAtt} />
                </HashRouter>

            </div>

        )
    }
}

export default Content;