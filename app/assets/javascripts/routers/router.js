TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "boards/:id": "boardShow"
  },
  
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  boardsIndex: function () {
    TrelloClone.Collections.boards.fetch();
    
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });

    this._swapView(indexView);
  },

  boardShow: function (id) {
    var board = TrelloClone.Collections.boards.getOrFetch(id);
    var showView = new TrelloClone.Views.ShowBoard({
      model: board
    });

    this._swapView(showView);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
});