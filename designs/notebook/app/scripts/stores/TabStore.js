var Reflux = require('reflux');

var objKeys = require('../helpers/objKeys.js');

var TabActions = Reflux.createActions([
    "tabCreate",
    "tabDelete",
    "tabLinkPage",
    "tabUnlinkPage"
]);

// Creates a DataStore
var TabStore = Reflux.createStore({
  init: function() {
    this.listenToMany(TabActions);
    this.tabs = {};
    this.tabCreate("t1","Tab One");
    this.tabCreate("t2","Tab Two");
    this.tabLinkPage("t1","p1");
    this.tabLinkPage("t1","p2");
    this.tabLinkPage("t2","p2");
  },
  getInitialState:function(){
    return this.tabs;
  },
  tabCreate:function(tabKey,tabName){
    this.tabs[tabKey] = {
      "name":tabName,
      "pages":{}
    };
    this.onUpdate();
  },
  tabDelete:function(tabKey){
    this.tabs[tabKey] = undefined;
    this.onUpdate();
  },
  tabLinkPage:function(tabKey,pageKey){
    this.tabs[tabKey].pages[pageKey] = true;
    this.onUpdate();
  },
  tabUnlinkPage:function(tabKey,pageKey){
    this.tabs[tabKey].pages[pageKey] = false;
    this.onUpdate();
  },
  // trigger update
  onUpdate:function(){
    this.trigger(this.tabs);
  },

  // convenience functions
  createNewKey:function(newTabName){
    return objKeys.newKeyTo(this.tabs,newTabName);
  }
});

module.exports = TabStore;