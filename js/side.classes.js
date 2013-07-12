jQuery.fn.sideMenu = function(options){
	var el = this;
	$.getJSON(options.url,function(data){
		App.sideMenuData = new Backbone.Collection(data);
		var side = new App.Views.AdminSide({
			el:el,
			collection:App.sideMenuData,
		});
		side.setCurrent(options.current);
	});
};
App.Views.AdminSideItem = Backbone.View.extend({
	tagName:"li",
	className:"side-item",
	itemTmpl:_.template('<a href="<%=url%>"> '
		+'<%if(icon){%><i class="<%=icon%>"></i> <%};%>'
		+'<%=name%> </a> '),
	headerTmpl:_.template('<%=name%>'),

	initialize:function(options){
		this.model = options.model;
		this.render();
	},
	render:function(){
		var data = _.defaults(this.model.toJSON(),{
			icon:false,
			type:"item"
		});
		this.$el.attr("data-name",data.name).data("view",this);
		if(data.type=="item"){
			this.$el.html(this.itemTmpl(data));
		};
		if(data.type=="header"){
			this.$el.addClass("nav-header");
			this.$el.html(this.headerTmpl(data));
		};
	},
	setUnactive:function(){
		this.$el.removeClass("active");
	},
	setActive:function(){
		this.trigger("beforeActive");
		this.$el.addClass("active");
	}
});
App.Views.AdminSide = Backbone.View.extend({
	tmpl:'<div class="sidenav clearfix">'
			+'<h1 class="brand">My Admin Theme</h1>'
			+'<ul class="nav nav-list"></ul>'
		+'</div>'
		,
	initialize:function(options){
		var that = this;
		this.$el.html(this.tmpl);
		this.collection = options.collection;
		this.collection.on("reset",function(){
			that.render();
		});
		if(this.collection.length)this.render();
	},
	render:function(){
		var that = this;
		var ul = this.$("ul:eq(0)").empty();
		this.collection.each(function(model){
			that.addItem(model,ul);
		});
	},
	setCurrent:function(name){
		this.$("[data-name='"+name+"']").data("view").setActive();
	},
	addItem:function(model,ul){
		var that = this;
		var view = new App.Views.AdminSideItem({model:model});
		view.on("beforeActive",function(){
			that.trigger("beforeActive");
		});
		this.on("beforeActive",function(){
			view.setUnactive();
		});
		ul.append(view.el);
	}
});