TrelloClone.Views.ShowList = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  event: {
    "click button#remove-list": "removeList"
  },
  
  tagName: 'li',
  
  initialize: function () {
    this.listenTo(this.model, "add sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  removeList: function (event) {
    event.preventDefault();
    
    var listId = $(event.currentTarget).data('list-id');
    debugger
    
    // need to remove list item from boards.lists
    // remove list from DOM
    // sever listeners
  }
});