var React = window.React = require('react')


var Reflux = require('reflux');
var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');
var WorkspaceStore = require('../stores/WorkspaceStore.js');

// My components
var Page = {
  Code: require('./Page.js'),
  Result: require('./Result.js'),
  Index: require('./Index.js')
}
// My helpers
var omap = require('../helpers/objItter.js').map;

var Workspace = React.createClass({
  mixins: [Reflux.connect(WorkspaceStore,"windows")],
  render: function(){
    var pages = this.state.windows
      .map(function(page,i){
        page.i = i;
        return page;
      })
      .filter(function(page){
        return !page.closed;
      })
      .map(function(page){
        switch (page.type){
          case "result": return <Page.Result key={page.i} pageIndex={page.i} page={page}/>;
          case "index": return <Page.Index key={page.i} pageIndex={page.i} tabKey={page.tabKey}/>;
        }
        return <Page.Code key={page.i} pageIndex={page.i} page={page}/>;
      });
    return (
      <div className="workspace">
        <ul className="workarea">{pages}</ul>
      </div>
    );
  }
});

module.exports = Workspace;
