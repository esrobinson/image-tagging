(function(root) {
	PT = root.PT = (root.PT || {});

	var Photo = PT.Photo = function(attributes){
		this.attributes = _.extend({}, attributes);
	};

	Photo.all = [];

	_.extend(Photo.prototype, {

		get: function(attr_name){
			return this.attributes[attr_name];
		},

		set: function(attr_name, val){
			return this.attributes[attr_name] = val;
		},

		create: function(callback){
			var that = this;

			if (this.get('id')){
				return false
			}

			$.ajax ({
				url: '/api/photos',
				type: 'POST',
				data: {photo: that.attributes},
				success: function(response){
					_.extend(that.attributes, response);
					Photo.addToAll([that]);
					Photo.trigger('add');
					callback(response);
				}
			});
		},

		save: function(callback){
			var that = this;

			if (!this.get('id')){
				console.log("create");

				that.create(callback);
			} else {
				console.log("save");

				putData = {
					title: this.get("title"),
					url: this.get("url")
				}
				$.ajax ({
					url: '/api/photos/' + that.get('id'),
					type: 'PUT',
					data: {photo: putData},
					success: function(response){
						_.extend(that.attributes, response);
						Photo.addToAll([that]);
						callback(response);
					}
				});
			}

		}
	});

	Photo.addToAll = function(photos){
		photoIds = _.map(photos, function(photo){
			return photo.get('id');
		});

		Photo.all = _.reject(Photo.all, function(photo){
			return _.include(photoIds, photo.get('id'));
		});

		Photo.all = Photo.all.concat(photos);
	}

	Photo.fetchByUserId = function (userId, callback){
		$.ajax ({
			url: '/api/users/' + userId + '/photos/',
			type: 'GET',
			success: function(response){
				photos = _.map(response, function(obj){
					return new Photo(obj);
				});
				Photo.addToAll(photos);
				callback(photos);
			}
		})
	};

	Photo.find = function(photo_id){
		return _.find(Photo.all, function(photo){
			return photo.get('id') == photo_id;
		});
	};

	Photo._events = {};

	Photo.on = function(eventName, callback){
		if(typeof(this._events[eventName] == 'undefined')){
			this._events[eventName] = [];
		}
		this._events[eventName].push(callback);
	};

	Photo.trigger = function(eventName){
		var callbacks = this._events[eventName]
		_.each(callbacks, function(callback){
			callback();
		});
	}

})(this);