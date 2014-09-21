TrelloClone.Views.NewList = Backbone.CompositeView.extend({
  template: JST["lists/new"],
  
  initialize: function () {
    this.listenTo(this.model, "add remove sync", this.render);
  },
  
  events: {
    "submit form#new-list-form": "addList"
  },
  
  render: function() {
    var renderedContent = this.template({ model: this.model });
    
    this.$el.html(renderedContent);
    return this;
  },
  
  addList: function (event) {
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    var list = new TrelloClone.Models.List({ 
      title: formData.list.title, 
      board_id: this.model.id
    });
    
    var that = this;
    list.save({}, {
      success: function () {
        that.collection.add(list);
        that.render();
      }
    });
  }
});