TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],
  
  tagName: 'ul',
  
  initialize: function () {
    this.listenTo(this.collection, "sync add", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    
    var formView = new TrelloClone.Views.NewBoard();
    this.$el.append(formView.render().$el)
    
    return this;
  }
});