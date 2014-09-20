TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({
  template: JST['boards/index_item'],
  
  events: {
    "click button#remove-board": "removeBoard"
  },
  
  render: function(){
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },
  
  removeBoard: function (event) {
    event.preventDefault();
    var boardId = $(event.currentTarget).data('board-id');
    this.model.destroy(); 
    
    this.trigger("remove", this);
    
    //need to find the subview to remove and call removeSubview() on it
  },
});