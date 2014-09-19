TrelloClone.Views.ShowBoard = Backbone.View.extend({
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
    
    var listContainer = this.$('.lists');
    this.model.lists().each( function (list) {
      var listView = new TrelloClone.Views.ShowList({ model: list });
      listContainer.append(listView.render().$el);
    });
    
    var newListContainer = this.$('.new-list');
    var formView = new TrelloClone.Views.NewList({
      model: this.model,
      collection: this.model.lists()
    });
    newListContainer.append(formView.render().$el);
    
    return this;
  }
});