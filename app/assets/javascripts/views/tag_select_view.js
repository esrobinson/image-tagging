(function(root){
  PT = root.PT = (root.PT || {});

  var TagSelectView = PT.TagSelectView = function(photo, event){
    this.photo = photo;
    this.event = event;
    this.$el = $('<div>');
  }

  _.extend(TagSelectView.prototype, {

    render: function(){
      var position = $('img').position()
      var top = position.top + this.event.offsetY - 50;
      var left = position.left + this.event.offsetX - 50;

      var options = JST["photo_tag_options"]({});
      var $tag = $('<div>')
      $tag.addClass('photo-tag');
      this.$el.css({left: left, top: top, position: 'absolute'});
      this.$el.append($tag).append($(options));
      return this;
    }
  });

})(this);