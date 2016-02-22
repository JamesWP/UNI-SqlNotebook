var React = window.React = require('react');
var Reflux = require('reflux');
var Links = require('./Links.js');
require('codemirror/mode/sql/sql.js');
require('codemirror/mode/markdown/markdown.js');
require('codemirror/addon/edit/matchbrackets.js');

var WorkspaceStore = require('../stores/WorkspaceStore.js');
var PageStore = require('../stores/PageStore.js');

var Codemirror = require('react-codemirror');
// Controller
var SqlNotebookController = require('../controller/main.js');
var Execute = require('../controller/execute.js');

import PageActionBar from './PageActionBar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';

const MODE_NORMAL = "NORMAL";
const MODE_REQUEST_CONFIRM = "REQUEST_CONFIRM";
const MODE_LINKS = "LINKS";

var Page = React.createClass({
    mixins: [Reflux.connect(PageStore,"pages")],
    getInitialState: function() {
        return {
          conTok: '',
          code: this.props.page.content,
          altered: false,
          mode: MODE_NORMAL
        };
    },
    updateCode: function(newCode) {
        this.setState({code: newCode, altered:true});
    },
    save: function() {
        this.setState({altered: false, mode: MODE_NORMAL});
        WorkspaceStore.savePage(this.props.pageIndex, this.state.code);
    },
    close: function() {
        if(this.state.altered){
          this.setState({mode: MODE_REQUEST_CONFIRM});
        }else{
          WorkspaceStore.closePage(this.props.pageIndex);
        }
    },
    confirmClose: function(confirmed){
      if(confirmed){
        // confirmed close with discard
        WorkspaceStore.closePage(this.props.pageIndex);
      }else{
        // cancel close
        this.setState({mode: MODE_NORMAL});
      }
    },
    disconnnect: function() {
        this.state.conTok = "";
        this.setState(this.state);
    },
    connect: function() {
        this.disconnnect();
        Execute.newSession({}, (conTok) => {
            this.state.conTok = conTok;
            this.setState(this.state);
        });
    },
    execute: function() {
        if (this.state.conTok.length > 0) {
          let ex = {
            conTok: this.state.conTok, content: this.state.code
          };
          Execute.execute(ex, (result) => {
            WorkspaceStore.openResult(result, this.props.pageIndex);
          });
        }
    },
    showLinks: function(){
      this.setState({mode:MODE_LINKS});
    },
    closeLinks: function() {
      this.setState({mode:MODE_NORMAL});
    },
    render: function() {
        //debugger;
        var options = {
            lineNumbers: true,
            mode: this.props.format=="sql"?"text/x-mssql":"text/x-markdown",
            matchBrackets: true
        };

        var linksout = PageStore.getLinksFrom(this.props.pageKey);
        var linksin = PageStore.getLinksTo(this.props.pageKey);

        var thisPage = this.state.pages[this.props.pageKey];
        var connectionButton;
        if (this.props.format!=="sql"){
          connectionButton = null;
        }else if(this.state.conTok.length > 0)
            connectionButton = [
                <MenuItem leftIcon={<FontIcon className="fa fa-refresh"/>} primaryText="Reconnect" onClick={this.connect}/>,
                <MenuItem leftIcon={<FontIcon className="fa fa-paper-plane"/>} primaryText="Execute" onClick={this.execute}/>
            ];
        else
            connectionButton = [
                <MenuItem leftIcon={<FontIcon className="fa fa-magic"/>} primaryText="Connect" onClick={this.connect}/>
            ];

        switch(this.state.mode){
            case MODE_REQUEST_CONFIRM:
            return (
              <li className="page">
                  <div className="head">
                      <b>{thisPage.name} {this.state.altered?"*":null}
                          <small> {this.props.pageIndex}</small>
                          <small onClick={()=>this.showLinks()}> links:{linksout.length + linksin.length}</small>
                          <button className="close" disabled={true}>X</button>
                      </b>
                      <div className="actions">
                          <button onClick={this.save}>Save</button>
                      </div>
                  </div>
                  <div>
                      <b>You have unsaved changes!</b>
                      <br/>
                      Please confirm you wish to exit and discard changes.
                      <br/>
                      <button onClick={()=>{this.confirmClose(true);}} >Close and discard</button>
                      <br/>
                      <button onClick={()=>{this.confirmClose(false);}}>Cancel close</button>
                  </div>
              </li>
            );
            case MODE_LINKS:
            return (
              <li className="page">
                  <div className="head">
                      <b>{thisPage.name} {this.state.altered?"*":null}
                          <small> {this.props.pageIndex}</small>
                          <small onClick={()=>this.showLinks()}> links:{linksout.length + linksin.length}</small>
                          <button className="close" disabled={true}>X</button>
                      </b>
                      <div className="actions">
                          <button onClick={this.save}>Save</button>
                      </div>
                  </div>
                  <div>
                      <Links pageKey={this.props.pageKey} in={linksin} out={linksout}/>
                      <button onClick={()=>{this.closeLinks();}}>close</button>
                  </div>
              </li>
            );
            default:
            return (
                <li className="page">
                    <PageActionBar
                      title={(
                        <span>{thisPage.name} {this.state.altered?"*":null}
                          <small> {this.props.pageIndex}</small></span>
                        )}
                      onClose={this.close}
                      menuItems={(
                          <div>
                            <MenuItem leftIcon={<FontIcon className="fa fa-link"/>} primaryText={"Links " + linksout.length + linksin.length} onClick={this.showLinks}/>
                            <MenuItem leftIcon={<FontIcon className="fa fa-save"/>} primaryText="Save" onClick={this.save}/>
                            {connectionButton}
                          </div>
                          )}
                    />
                    <Codemirror value={this.state.code} onChange={this.updateCode} options={options}/>
                </li>
            );
        }

    }
});

module.exports = Page;
