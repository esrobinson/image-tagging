// This is a manifest file that'll be compiled into application.js,
// which will include all the files listed below.
//
// Any JavaScript/Coffee file within this directory,
// lib/assets/javascripts, vendor/assets/javascripts, or
// vendor/assets/javascripts of plugins, if any, can be referenced
// here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll
// appear at the bottom of the the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE
// PROCESSED, ANY BLANK LINE SHOULD GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.serializeJSON
//= require underscore
//
//= require_tree ./models
//= require_tree ./views
//= require_tree ../templates
//
//= require_tree .

PT.initialize = function(){
	PT.showPhotosIndex();
};

PT.showPhotosIndex = function(){
	PT.Photo.fetchByUserId(CURRENT_USER_ID, function(photos){
		$("#content").html("")
		var list = new PT.PhotosListView();
		$("#content").append(list.render().$el);
		var form = new PT.PhotoFormView();
		$("#content").append(form.render().$el);
	});
}

PT.showPhotoDetail = function(photo){
	$("#content").html("")
	var detail = new PT.PhotoDetailView(photo);
	$("#content").append(detail.render().$el);
}


// $(function(){
// 	p new PT.Photo({
// 		url: "http://imgur.com/gallery/ZJccCgs"
// 	});
// })