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
			$back = $('<button>').attr('id', 'back').text('Back');
			$header = $('<h1>').text(this.photo.get('title'));
			$img = $('<img>').attr('src', this.photo.get('url'));
			this.$el.append($back).append($header).append($img);
			return this;
		},

		popTagSelectView: function(event){
			tag = new PT.TagSelectView(this.photo, event);
			this.$el.append(tag.render().$el);
		}
	})


})(this);