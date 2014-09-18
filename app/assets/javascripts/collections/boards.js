TrelloClone.Collections.Boards = Backbone.Collection.extend({
  model: TrelloClone.Models.Board,
  
  url: "api/boards",
  
  getOrFetch: function (id) {
    var boards = this;
    var board;
    
    if (board = this.get(id)) {
      board.fetch();
    } else {
      board = new TrelloClone.Models.Board({ id: id });
      board.fetch({
        success: function () { boards.add(board) }
      });
    }
    return feed;
  }
});