TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],
  
  className: 'col-md-3',
    
  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.render);
    this.listenTo(this.collection, "add", this.addBoard);
    
    var that = this;
    this.collection.each(function (board) {
      that.addBoard(board);
    });
  },
  
  addBoard: function (board) {
    var indexItem = new TrelloClone.Views.BoardsIndexItem({ model: board });
    this.addSubview('#board-items', indexItem);
    this.listenTo(indexItem, "remove", this.removeBoard);
  },
  
  render: function () {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    
    var formView = new TrelloClone.Views.NewBoard();
    this.$el.append(formView.render().$el);
    this.attachSubviews();
    
    return this;
  },
  
  removeBoard: function (boardSubView) {
    this.removeSubview('#board-items', boardSubView);
  }
});