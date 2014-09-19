TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],
  
  className: 'col-md-3',
    
  initialize: function () {
    this.listenTo(this.collection, "sync add", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    
    var formView = new TrelloClone.Views.NewBoard();
    
    this.addSubview("#form-wrapper",formView);
    
    return this;
  },
  
  addList: function (list) {
    var listShow = new TrelloClone.Views.ShowList({ model: list });
    this.addSubview("#lists-wrapper", listShow)
  }
});