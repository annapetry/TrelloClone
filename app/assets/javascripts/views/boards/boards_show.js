TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  tagName: 'ul',
  
  initialize: function () {
    this.listenTo(this.model, "add sync", this.render);
    this.listenTo(this.model.lists(), "add sync", this.render)
  },
  
  render: function () {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);

    var that = this;
    
    this.model.lists().each( function (list) {
      var listView = new TrelloClone.Views.ShowList({ model: list });
      that.addSubview('.lists', listView);
    });
    
    var formView = new TrelloClone.Views.NewList({
      model: this.model,
      collection: this.model.lists()
    });
    this.addSubview('.new-list', formView);
    
    return this;
  }
});