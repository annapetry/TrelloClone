TrelloClone.Views.ShowCard = Backbone.CompositeView.extend({
  template: JST["cards/show"],
  
  events: {
    "click button#remove-card": "removeCard"
  },

  initialize: function () {
    this.listenTo(this.model, "add remove sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  removeCard: function (event) {
    event.preventDefault();
    this.model.destroy();
    this.trigger("remove", this);
  }
});