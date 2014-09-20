TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function () {
    this.listenTo(this.model, "add sync remove", this.render);
    this.listenTo(this.model.lists(), "add sync remove", this.addList);

    var that = this;
    this.model.lists().each(function (list) {
      that.addList(list);
    });
    
    var formView = new TrelloClone.Views.NewList({
      model: this.model,
      collection: this.model.lists()
    });
    
    this.addSubview('.new-list', formView);
  },

  addList: function (list) {
    var showList = new TrelloClone.Views.ShowList({ model: list });
    this.addSubview('#lists', showList);
    this.listenTo(showList, "remove", this.removeList);
  },
  
  events: {
    "click button#remove-board": "removeBoard"
  },
  
  render: function () {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);

    var that = this;
    
    this.model.lists().each( function (list) {
      var listView = new TrelloClone.Views.ShowList({ model: list });
      that.addSubview('.lists', listView);
    });

    this.attachSubviews();
    $('.list-container').sortable();
    
    return this;  
  },
  
  removeBoard: function (event) {
    event.preventDefault();
    this.model.destroy();
    
    window.location.hash = '';
  }
});