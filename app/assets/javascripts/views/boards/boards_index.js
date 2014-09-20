TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],
  
  className: 'boards',
    
  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.render);
    this.listenTo(this.collection, "add", this.addBoard);
    
    this.createSubviews();
    this.addFormView();
  },
  
  createSubviews: function () {
    var that = this;
    this.collection.each(function (board) {
      that.addBoard(board);
    });
  },
  
  addFormView: function () {
    var formView = new TrelloClone.Views.NewBoard();
    this.addSubview('#form-wrapper', formView);
  },
  
  addBoard: function (board) {
    var indexItem = new TrelloClone.Views.BoardsIndexItem({ model: board });
    this.addSubview('#board-items', indexItem);
    this.listenTo(indexItem, "remove", this.removeBoard);
  },
  
  render: function () {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    return this;
  },
  
  removeBoard: function (boardSubView) {
    this.removeSubview('#board-items', boardSubView);
  }
});