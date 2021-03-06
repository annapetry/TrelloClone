TrelloClone.Views.ShowList = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  events: {
    "click button#list-modal": "showModal",
    "click button#delete-list": "removeList",
    "sortstop .cards": "saveCard",
    "sortreceive .cards": "catchCard"
  },
  
  className: 'list-container',
  
  attributes: function() {
    return {
      'data-list-id': this.model.id
    };
  },
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    
    this.createSubviews();
    this.addFormView();
  },
  
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    
    this.$deleteListModal = this.$('#deleteListModal');
    
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
  
  showModal: function () {
    this.$deleteListModal.modal();
  },
  
  removeList: function (event) {
    event.preventDefault();
    var that = this;
     
    this.$deleteListModal.modal('hide');
    this.$deleteListModal.one('hidden.bs.modal', function (){
      that.model.destroy();   
      that.trigger("remove", that);         
    });
  }, 
  
  removeCard: function (cardSubView) {
    this.removeSubview('.cards', cardSubView);
  },
  
  catchCard: function (event, ui) {
    var currentCardId = ui.item.data('card-id');
    var newOrd = ui.item.index();
    var cardCopy = new TrelloClone.Models.Card({
      id: currentCardId,
      list_id: this.model.id,
      ord: newOrd
    });
    
    cardCopy.save({}, {
      success: this.model.cards().add(cardCopy, { silent: true })
    });
    
    this.saveCard(event);
  },

  saveCard: function (event) {
    event.stopPropagation();
    this.saveOrds();
  },
  
  // saveOrds is getting called on an event, but it starts with the first card on the page and errors-out
  
  saveOrds: function() {
    var itemElements = '.single-card';
    $(itemElements).each(function(index, element) {
      var collection = this.model.cards();
      var itemId = $(element).data('card-id');
      debugger
      var item = collection.get(itemId);
      if (item.get('ord') === index) {
        return;
      }
      item.save({ord: index});
    }.bind(this));
  }
});

