(function(root) {
  PT = root.PT = (root.PT || {});

  var PhotoTagging = PT.PhotoTagging = function(attributes){
    this.attributes = _.extend({}, attributes);
  };

  PhotoTagging.all = [];

  _.extend(PhotoTagging.prototype, {

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
        url: '/api/photos_taggings',
        type: 'POST',
        data: {photo_tagging: that.attributes},
        success: function(response){
          _.extend(that.attributes, response);
          PhotoTagging.addToAll([that]);
          PhotoTagging.trigger('add');
          callback(response);
        }
      });
    },

  //   save: function(callback){
  //     var that = this;

  //     if (!this.get('id')){
  //       console.log("create");

  //       that.create(callback);
  //     } else {
  //       console.log("save");

  //       putData = {
  //         title: this.get("title"),
  //         url: this.get("url")
  //       }
  //       $.ajax ({
  //         url: '/api/photo_taggings/' + that.get('id'),
  //         type: 'PUT',
  //         data: {photo: putData},
  //         success: function(response){
  //           _.extend(that.attributes, response);
  //           PhotoTagging.addToAll([that]);
  //           callback(response);
  //         }
  //       });
  //     }

  //   }
  });

  PhotoTagging.addToAll = function(photoTaggingIds){
    photoTaggingIds = _.map(photoTaggings, function(photoTagging){
      return photoTagging.get('id');
    });

    PhotoTagging.all = _.reject(PhotoTagging.all, function(photoTagging){
      return _.include(photoTaggingIds, photoTagging.get('id'));
    });

    PhotoTagging.all = PhotoTagging.all.concat(photoTaggings);
  }

  PhotoTagging.fetchByPhotoId = function (photoId, callback){
    $.ajax ({
      url: '/api/photos/' + photoId + '/photo_taggings/',
      type: 'GET',
      success: function(response){
        photoTaggings = _.map(response, function(obj){
          return new PhotoTagging(obj);
        });
        PhotoTagging.addToAll(photoTaggings);
        callback(photoTaggings);
      }
    })
  };

  PhotoTagging.find = function(photoTagging_id){
    return _.find(PhotoTagging.all, function(photoTagging){
      return photoTagging.get('id') == photoTagging_id;
    });
  };

  PhotoTagging._events = {};

  PhotoTagging.on = function(eventName, callback){
    if(typeof(this._events[eventName] == 'undefined')){
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
  };

  PhotoTagging.trigger = function(eventName){
    var callbacks = this._events[eventName]
    _.each(callbacks, function(callback){
      callback();
    });
  }

})(this);