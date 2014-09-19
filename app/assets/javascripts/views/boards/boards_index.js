TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],
  
  tagName: 'ul',
  
  initialize: function () {
    this.listenTo(this.collection, "sync add", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    
    var formView = new TrelloClone.Views.NewBoard();
    
    this.addSubview("#form-wrapper",formView);
    
    return this;
  }
});