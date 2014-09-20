TrelloClone.Views.NewBoard = Backbone.CompositeView.extend({
  template: JST["boards/new"],
  
  events: {
    "submit form#new-board-form": "addBoard"
  },
  
  render: function() {
    var renderedContent = this.template({ model: this.model });
    
    this.$el.html(renderedContent);
    return this;
  },
  
  addBoard: function (event) {
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    var board = new TrelloClone.Models.Board({ title: formData.board.title });
    var that = this;
    
    board.save({}, {
      success: function () {
        TrelloClone.Collections.boards.add(board);
        that.render();
      }
    });
  }
});