var React = window.React = require('react')
var Reflux = require('reflux');
var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');
// My helpers
var omap = require('../helpers/objItter.js').map;

var Tab = React.createClass({
    mixins: [Reflux.connect(PageStore,"pages")],
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    createPage: function(){
      var pageName = this.state.value;
      if(pageName.length>0){
        var pageKey  =PageStore.createNewKey(pageName)
        PageStore.pageCreate(pageKey, pageName);
        TabStore.tabLinkPage(this.props.tabID,pageKey);
        this.setState({value:""});
      }
    },
    openPage: function(pkey){
      var tabID = this.props.tabID;
      //TODO: send message to workspace store to open page
    },
    openIndex: function(){
      //TODO: send message to workspace store to open index page for this tab
    },
    render: function() {
        var t = this;
        var tab = this.props.tab;
        var spages = this.state.pages;
        var _openPage = this.openPage.bind(this.props.tabID);
        var pages = omap(tab.pages, function(pkey, bind) {
          if(!bind)return undefined;
          var page = spages[pkey];
          return <li key={pkey} onClick={_openPage(pkey)}>{page.name}</li>;
        });
        return (
            <div className={"tab"}>
                <h1>{tab.name}</h1>
                <ul>{pages}</ul>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <br/>
                <button onClick={this.createPage}>Create new page</button>
                <button onClick={this.openIndex}>View index</button>
            </div>
        );
    }
});

module.exports = Tab;
