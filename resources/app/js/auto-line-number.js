;(function($){
	var AutoRowsNumbers = function (element, config){
	    this.$element = $(element);
	    this.$group = $('<div/>', { 'class': "textarea-group" });
	    this.$ol = $('<div/>', { 'class': 'textarea-rows' });
	    this.$wrap = $('<div/>', { 'class': 'textarea-wrap' });
	    this.$group.css({
	    	"width" : this.$element.outerWidth(true) + 'px',
	    	"display" : config.display
	    });
	    this.$ol.css({
	    	"color" : "#aaa",
	    	"width" : config.width,
	    	"height" : this.$element.height(),
	    	"font-size" : '14px',
	    	"line-height" : '18px',
	    	"position" : "absolute",
	    	"overflow" : "hidden",
	    	"margin" : 0,
	    	"padding" : 0,
	    	"margin-right" : "2px",
	    	"text-align": "right",
	    	"right":"3px",
	    	"letter-spacing":"1px",
	    	"display":"block",
	    	"font-family": "微软雅黑"
	    });
	    this.$wrap.css({
	    	"padding" : ((this.$element.outerHeight() - this.$element.height())/2) + 'px 0',
	    	"background-color" :"#234",
	    	"position" : "absolute",
	    	"width" : config.width,
	    	"height" : this.$element.height() + 'px'
	    });
	    this.$element.css({
	    	"white-space" : "pre",
	    	"resize": "none",
	    	"margin-left" : (parseInt(config.width) -  parseInt(this.$element.css("border-left-width"))) + 'px',
	    	"width": (this.$element.width() - parseInt(config.width)) + 'px',
	    	"font-size" : '14px',
	    	"line-height" : '18px'
	    });

	}

	AutoRowsNumbers.prototype = {
		constructor: AutoRowsNumbers,

		init : function(){
			var that = this;
			that.$element.wrap(that.$group);
			that.$ol.insertBefore(that.$element);
			this.$ol.wrap(that.$wrap)
			// that.$element.on('keydown',{ that: that }, that.inputText);
			// that.$element.on('scroll',{ that: that },that.syncScroll);

			that.$element.keydown( that.inputText.bind(this) );
			that.$element.scroll(that.syncScroll.bind(this));
			that.inputText({data:{that:that}});
		},

		inputText: function(event){
			// var that = event.data.that;
			var that = this;
			setTimeout(function(){
				var value = that.$element.val();
				value.match(/\n/g) ? that.updateLine(value.match(/\n/g).length+1) : that.updateLine(1);
				that.syncScroll({data:{that:that}});
			},0);
		},

		updateLine: function(count){
			var that = this;
			that.$element;
			that.$ol.html('');

			for(var i=1;i<=count;i++){
				that.$ol.append("<div>"+i+"</div>");
			}
		},

		syncScroll: function(event){
			// var that = event.data.that;
			var that = this;

			that.$ol.children().eq(0).css("margin-top",  -(that.$element.scrollTop()) + "px");
		}
	}

	$.fn.setTextareaCount = function(option){
		var config = {};
		var option = arguments[0] ? arguments[0] : {};
		config.color = option.color ? option.color : "#FFF";
		config.width = option.width ? option.width : "30px";
		config.bgColor = option.bgColor ? option.bgColor : "#999";
		config.display = option.display ? option.display : "block";

	    return this.each(function () {
	      var $this = $(this),
	          data = $this.data('autoRowsNumbers');

	      if (!data){ $this.data('autoRowsNumbers', (data = new AutoRowsNumbers($this, config))); }
	      
		  if (typeof option === 'string'){
	        return false;
	      } else {
	        data.init();
	      }
	    });
	}
})(jQuery)
