TrelloClone.Views.ShowList = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  events: {
    "click button#remove-list": "removeList"
  },
  
  className: 'list-container',
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    
    this.createSubviews();
    this.addFormView();
  },
  
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    return this;
  },
  
  createSubviews: function () {
    var that = this;
    this.model.cards().each( function (card) {
      that.addCard(card);
    });
  },
  
  addCard: function (card) {
    var showCard = new TrelloClone.Views.ShowCard({ model: card });
    this.addSubview('.cards', showCard);
    this.listenTo(showCard, "remove", this.removeCard);
  },
  
  addFormView: function () {
    var formView = new TrelloClone.Views.NewCard({
      model: this.model,
      collection: this.model.cards()
    });

    this.addSubview('.new-card', formView);
  },
  
  onRender: function () {
    this.$('.cards').sortable({
      connectWith: ".cards"
    });
  },
  
  removeList: function (event) {
    event.preventDefault();
    this.model.destroy(); 
    this.trigger("remove", this);
  }, 
  
  removeCard: function (cardSubView) {
    this.removeSubview('.cards', cardSubView);
  }
});