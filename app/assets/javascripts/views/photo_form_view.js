(function(root){
	PT = root.PT = (root.PT || {});

	var PhotoFormView = PT.PhotoFormView = function(){
		this.$el = $("<div>");
		this.$el.on('submit', 'form', this.submit);
	};

	_.extend(PhotoFormView.prototype, {
		render: function(){
			this.$el.html("");
			var content = JST["photo_form"]({});
			this.$el.append($(content));
			return this;
		},

		submit: function(event){
			event.preventDefault();

			var $form = $(event.currentTarget);
			var formData = $form.serializeJSON();

			delete formData['_method'];
			delete formData['authenticity_token'];

			var photo = new PT.Photo(formData);
			photo.create(function(){
				$("#photo_url").val("");
				$("#photo_title").val("");
			});
		}
	});

})(this);