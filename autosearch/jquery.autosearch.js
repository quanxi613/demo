;(function($) {

	$.fn.autosearch = function(arg) {
		var opt = $.extend({}, $.fn.defaults, arg);
		var input = $(opt.selector);
		var suggestBox = this;


		return this.each(function() {
			var current = null;
			input.bind('keyup', function() {
				current = $(this);
				var searchVal = current.val();
				doAjax(searchVal, suggestBox, opt.ajaxUrl, current);
				
			});
			doHide(suggestBox);
			getValue(input, suggestBox);
			
		});
	};
	
	$.fn.defaults = {
		selector: '#search-input',
		ajaxUrl: 'searchajax'
	};

	function doAjax(searchVal, suggestBox, ajaxUrl, current) {		
		$.ajax({
			type: 'GET',
			url: ajaxUrl,
			data: 'p='+searchVal,
			datatype: 'json',
			success: function(data) {
				var obj = null;
				if(typeof data == 'string'){
				    obj = eval("("+data+")");
				}
				else {
				    obj = data;
				}
				var htmlArr = [];
				htmlArr.push('<ul>');
				for(var i=0, len=obj.data.length; i<len; i++){
					htmlArr.push('<li>' + obj.data[i].txt + '</li>');
				} 
				htmlArr.push('</ul>');
				suggestBox.html(htmlArr.join(''));

				suggestBox.show().css({
					top: current.offset().top + current.height(),
					left: current.offset().left,
					position: 'absolute'
				});

				getValue(current,suggestBox);
			}
		});		
	}

	function doHide(suggestBox) {
		$(document).on('click', function() {
			suggestBox.hide();
		});
	}

	function getValue(input, suggestBox) {
		suggestBox.on('click', 'li', function() {				
			input.val($(this).html());
		});
	}
})(jQuery);
