TrelloClone.Views.ShowCard = Backbone.CompositeView.extend({
  template: JST["cards/show"],
  
  events: {
    "click button#remove-card": "removeCard",
  },

  initialize: function () {
    this.listenTo(this.model, "add remove sync", this.render);
  },
  
  className: 'single-card',
  
  attributes: function() {
    return {
      'data-card-id': this.model.id
    };
  },
  
  render: function () {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    this.$deleteCardModal = this.$('#deleteCardModal');
    
    return this;
  },
  
  removeCard: function (event) {
    event.preventDefault();
    this.$deleteCardModal.modal('hide');
    
    var that = this;
    this.$deleteCardModal.one('hidden.bs.modal', function () {
      that.model.destroy();
      that.trigger("remove", that);
    });
  }
});