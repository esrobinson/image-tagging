(function(root){
	PT = root.PT = (root.PT || {});

	var PhotosListView = PT.PhotosListView = function(){
		this.$el = $("<div>")

		this.$el.on('click', 'a', this.showDetail);
		PT.Photo.on('add', this.render.bind(this));
	};

	_.extend(PhotosListView.prototype, {
		render: function(){
			this.$el.html("");
			var $ul = $("<ul>");
			this.$el.append($ul);

			_.each(PT.Photo.all, function(photo){
				var $li = $("<li>");
				var $link = $('<a href="#">')
											.text(photo.get("title"))
											.attr('data-id', photo.get('id'));
				$li.append($link);
				$ul.append($li);
			});

			return this;
		},

		showDetail: function(event){
			event.preventDefault();

			var photo_id = $(event.currentTarget).data('id');
			var photo = PT.Photo.find(photo_id);

			PT.showPhotoDetail(photo);
		}
	});


})(this);