TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  events: {
    "click button#remove-board": "removeBoard",
    "sortstop #lists": "saveOrds"
    },
  
  className: 'board-show',
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    
    this.createSubviews();
    this.addFormView();
  },
  
  addFormView: function () {
    var formView = new TrelloClone.Views.NewList({
      model: this.model,
      collection: this.model.lists()
    });

    this.addSubview('#list-form', formView);
  },
  
  createSubviews: function () {
    var that = this;
    this.model.lists().each(function (list) {
      that.addList(list);
    });
  },

  addList: function (list) {
    var showList = new TrelloClone.Views.ShowList({ model: list });
    this.addSubview('#lists', showList);
    this.listenTo(showList, "remove", this.removeList);
  },
  
  render: function () {
    
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);

    this.attachSubviews();
    $('#lists').sortable();
    this.onRender();
    
    return this;  
  },
  
  removeBoard: function (event) {
    event.preventDefault();
    this.model.destroy();
    
    window.location.hash = '';
  },
  
  removeList: function (listSubView) {
    this.removeSubview('#lists', listSubView);
  },

  saveOrds: function() {
    var itemElements = '.list-container';
    var collection = this.model.lists();
    $(itemElements).each(function(index, element) {
      var itemId = $(element).data('list-id');
      var item = collection.get(itemId);
      if (item.get('ord') === index) {
        return;
      }
      item.save({ord: index});
    }.bind(this));
  }

});

