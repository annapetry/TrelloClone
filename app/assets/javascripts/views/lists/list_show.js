TrelloClone.Views.ShowList = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  event: {
    "click button#remove-list": "removeList"
  },
  
  className: 'col-md-4',
  
  initialize: function () {
    this.listenTo(this.model, "add sync", this.render);
    this.listenTo(this.model.cards(), "add sync", this.render)
  },
  
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    
    var that = this;
    this.model.cards().each( function (card) {
      var cardView = new TrelloClone.Views.ShowCard({ model: card });
      that.addSubview('.cards', cardView);
    });

    var formView = new TrelloClone.Views.NewCard({
      model: this.model,
      collection: this.model.cards()
    });

    this.addSubview('.new-card', formView);

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