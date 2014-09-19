TrelloClone.Views.ShowCard = Backbone.CompositeView.extend({
  template: JST["cards/show"],

  initialize: function () {
    this.listenTo(this.model, "add sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    
    return this;
  }
});