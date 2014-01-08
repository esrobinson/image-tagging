(function(root){
	PT = root.PT = ( root.PT || {} );

	var PhotoDetailView = PT.PhotoDetailView = function(photo){
		this.photo = photo;
		this.$el = $('<div>');

		this.$el.on('click', 'button', PT.showPhotosIndex);
		this.$el.on('click', 'img', this.popTagSelectView.bind(this));
	}

	_.extend(PhotoDetailView.prototype, {

		render: function(){
			this.$el.html('');
			console.log(this);
			$back = $('<button>').attr('id', 'back').text('Back');
			$header = $('<h1>').text(this.photo.get('title'));
			$img = $('<img>').attr('src', this.photo.get('url'));
			this.$el.append($back).append($header).append($img);
			return this;
		},

		popTagSelectView: function(event){
			console.log('test?');
			var position = $('img').position()
			var top = position.top + event.offsetY - 50;
			var left = position.left + event.offsetX - 50;

			$tag = $('<div>');
			$tag.addClass('photo-tag').css('position', 'absolute');
			$tag.css({left: left, top: top});
			this.$el.append($tag);
		}
	})


})(this);