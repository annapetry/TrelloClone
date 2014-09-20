TrelloClone.Views.NewCard = Backbone.CompositeView.extend({
  template: JST["cards/new"],
  
  initialize: function () {
    this.listenTo(this.model, "add remove sync", this.render);
  },
  
  events: {
    "submit form#new-card-form": "addCard"
  },
  
  render: function() {
    var renderedContent = this.template({ model: this.model });
    
    this.$el.html(renderedContent);
    return this;
  },
  
  addCard: function (event) {
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    var card = new TrelloClone.Models.Card({ 
      title: formData.card.title,
      list_id: this.model.id 
    });
    
    var that = this;
    card.save({}, {
      success: function () {
        that.collection.add(card);
      }
    });
  }
});