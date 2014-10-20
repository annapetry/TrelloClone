TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({
  template: JST['boards/index_item'],
  
  events: {
    "click button#board-modal": "showModal",
    "click button#remove-board": "removeBoard"
  },
  
  render: function(){
    var content = this.template({ board: this.model });
    this.$el.html(content);
    this.$deleteBoardModal = this.$('#deleteBoardModal');
    return this;
  },
  
  showModal: function () {
    this.$deleteBoardModal.modal();
  },
  
  removeBoard: function (event) {
    event.preventDefault();
    this.$deleteBoardModal.modal('hide');
    
    var that = this;
    this.$deleteBoardModal.one('hidden.bs.modal', function (){
      that.model.destroy();
      that.trigger("remove", that);
    });
  },
});