TrelloClone.Views.NewBoard = Backbone.View.extend({
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
    
    board.save({}, {
      success: function () {
        TrelloClone.Collections.boards.add(board);
      }
    });
  }
});