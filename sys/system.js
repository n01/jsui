(function($) {
	$.fn.someCss = function(opzioni) {
		var settings = {
			bgcolor: "yellow",
			border: "0px solid black",
			//width: "100px",
			height: "100px",
			position: "absolute"
		};
		if(opzioni) {
			jQuery.extend(settings, opzioni);
		}
		return $(this).css("background", settings.bgcolor)
					  .css("border", settings.border)
					  .css("width", settings.width)
					  .css("height", settings.height)
					  .css("position", settings.position);
	}
})(jQuery);
(function($) {
	$.fn.center = function () {
	    $(this).css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
	    return $(this);
	}
})(jQuery);
(function($) {
	$.fn.refreshContent = function(opt) {
		var settings = {
			type: "GET",
			param: "",
			url: "",
			cont: $(this)
		}
		if(opt) {
			jQuery.extend(settings, opt);
		}
		$.ajax({
			url: settings.url,
			type: settings.type,
			data: settings.param,
			success: function(msg) {
				settings.cont.html(msg);
			}
		});
		return settings.cont;
	}
})(jQuery);
var curZ = -1;
function Box (Opt) {	
	this.opt = {
		id: "newBox",
		url: "home.php",
		param: "lol=asd",
		width: 500,
		height: 400,
		left: 300,
		bottom: 400,
		father: "body",
		bgcolor: "white",
		border: "1px solid black",
		speed: 400
	}
	if(Opt) {
		jQuery.extend(this.opt, Opt);
	}
	this.isOpened = false;
	this.theBox = null;
	this._appearOrDisappear = function() {
		if(!this.isOpened) {
			this.theBox = $("<div></div>")
				.appendTo(this.opt.father)
				.refreshContent({
					url: this.opt.url,
					param: this.opt.param
				})
				.click(function() {
					curZ++;
					$(this).css("z-index", curZ)
				})
				.bind("drag", function(){
					curZ++;
					$(this).css("z-index", curZ)
				})
				.css({
					position: "absolute",
					left: this.opt.left,
					width: this.opt.width,
					opacity: "0",
					background: this.opt.bgcolor,
					border: this.opt.border
				})
				.animate({
					height: this.opt.height, 
					bottom: this.opt.bottom, 
					opacity: 1
				}, this.opt.speed)
				
				.attr({
					id: this.opt.id
				})
				.draggable({
					opacity: .90,
					cursor: "move"
				});
			this.isOpened = true;
		}
		else {
			this.theBox
			.animate({height: 0, bottom: 40, opacity: 0}, this.opt.speed, function(){
				this.theBox = null;
			})
			this.isOpened = false;
		}
	}
}

function Icon(opt) {
	this._show = function() {
		this._icon = $("<div></div>")
			.appendTo("body")
			.css({
				backgroundImage: "url("+opt.image+")",
				backgroundRepeat: "no-repeat",
				height: "43px",
				width: "44px",
				top: opt.top
			})
			.draggable({
				opacity: .90,
				cursor: "move"
			})
			.click(function(){
				opt.boxObj._appearOrDisappear();
				if(opt.boxObj.isOpened) {
					$(this).css("backgroundImage", "url("+opt.imagec+")")
					
				}
				else	
					$(this).css("backgroundImage", "url("+opt.image+")")
			});
	}
}

function appsParser(xml) {
	var icons = new Array();
	var i = 0;
	$(xml).find("app").each(function() {
		var icon = $(this).find("icon");
		var box = $(this).find("box");
		icons[i] = new Icon({
			boxObj: new Box({
						left: box.find("left").text(),
						bottom: box.find("bottom").text(),
						bgcolor: box.find("bgcolor").text(),
						url: box.find("url").text(),
						param: box.find("url").attr("param")
					}),
			image: "img/"+icon.find("img").text(),
			imagec: "img/"+icon.find("imgc").text(),
			top: icon.find("top").text()
		});
		icons[i]._show();
		i++;
	});
}

