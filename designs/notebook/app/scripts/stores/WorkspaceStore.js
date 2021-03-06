var Reflux = require('reflux');

var PageStore = require('../stores/PageStore.js');
var TabStore = require('../stores/TabStore.js');

var WorkspaceActions = Reflux.createActions([
    "openPage",
    "closePage"
]);

/**

{
  "type":""

}

**/
// Creates a DataStore
var WorkspaceAction = Reflux.createStore({
  init: function() {
    this.listenToMany(WorkspaceActions);
    this.windows = [];

  },
  getInitialState:function(){
    return this.windows;
  },
  openPage:function(pageKey){
    var page = PageStore.getInitialState()[pageKey];
    switch(page.type){
        case "result":
          this.windows.push({
            type:"result",
            pageKey:pageKey,
            result:page.content
          });
          break;
        default:
          this.windows.push({
            type:page.type,
            pageKey:pageKey,
            content:page.content
          });
    }
    this.onUpdate();
    return this.windows.length-1; // return new page index for handle
  },
  openResult: function(result, pageReference){
    var pageKey = null;
    // adapted to be flexible to open page index or pagekey
    if(typeof(pageReference)==='string'){
      pageKey = pageReference;
    }else{
      pageKey = this.windows[pageReference].pageKey;
    }
    this.windows.push({
      type: "result",
      content: result,
      resultOf: pageKey
    });
    this.onUpdate();
  },
  openPageAtVersion(pageKey,index){
    var page = PageStore.getInitialState()[pageKey];
    var content = page.oldContent[index];
    this.windows.push({
      type: page.type,
      pageKey: pageKey,
      content: content.content
    });
    this.onUpdate();
  },
  openIndexPage:function(tabKey){
    var page = TabStore.getInitialState()[tabKey];
    this.windows.push({
      type:"index",
      tabKey:tabKey
    });
    this.onUpdate();
  },
  openSearch:function(term){
    this.windows.push({
      type:'search',
      term: term
    });
    this.onUpdate();
  },
  closePage:function(pageIndex){
    this.windows[pageIndex].closed=true;
    var allClosed = true;
    for(var i=0;i<this.windows.length;i++)
      allClosed = allClosed && this.windows[i].closed;

    if(allClosed){
      setTimeout(()=>window.sqlnotebook.OpenSide(),100);
    }

    this.onUpdate();
  },
  savePage:function(pageIndex,content){
    var page = this.windows[pageIndex];
    var pkey = page.pageKey;
    PageStore.pageSave(pkey,content);
  },
  onUpdate:function(){
    this.trigger(this.windows);
  },
  getData: function(){
    return {
      'windows': this.windows
    };
  },
  setData: function(data){
    this.windows = data.windows;
    this.onUpdate();
  }
});

module.exports = WorkspaceAction;
