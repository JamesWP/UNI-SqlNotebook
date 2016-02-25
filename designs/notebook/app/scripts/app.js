var React = window.React = require('react'),
    ReactDOM = require('react-dom'),
    mountNode = document.getElementById("app");

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

import LeftNav from 'material-ui/lib/left-nav';
import PageActionBar from './ui/PageActionBar';


// My components
var Binder = require('./ui/Binder.js'),
    Workspace = require('./ui/Workspace.js'),
    Toggle = require('./ui/Toggle.js');

var SqlNotebookApp = React.createClass({
  getInitialState:()=>{return {open:true};},
  onToggle:function(){
    this.setState({open: !this.state.open});
  },
  render: function() {
    return (
      <div className={"container"}>
        <LeftNav open={this.state.open} width={300} disableSwipeToOpen={true}>
          <PageActionBar title={"Binder"} onClose={this.onToggle}/>
          <Binder open={this.state.open}/>
        </LeftNav>
        <Toggle open={this.state.open} onToggle={this.onToggle}/>
        <Workspace/>
      </div>
    );
  }
});


ReactDOM.render(<SqlNotebookApp />, mountNode);

window.sqlnotebook = {
  PageStore: require('./stores/PageStore.js'),
  WorkspaceStore: require('./stores/WorkspaceStore.js'),
  TabStore: require('./stores/TabStore.js')
};
