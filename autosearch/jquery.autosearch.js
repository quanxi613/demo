;(function($) {
	var defaults = {
		selector: '#search-input',
		ajaxUrl: 'searchajax'
	};

	$.fn.autosearch = function(arg) {
		var opt = $.extend({}, defaults, arg);
		var input = $(opt.selector);
		var suggestBox = this;


		return this.each(function() {
			input.bind('keyup', function() {
				var searchVal = $(this).val();
				doAjax(searchVal, input, suggestBox, opt.ajaxUrl);				
			});
			doHide(suggestBox);
			getValue(input,suggestBox);
		});
	}

	function doAjax(searchVal, input, suggestBox, ajaxUrl) {		
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
					top: input.offset().top + input.height(),
					left: input.offset().left,
					position: 'absolute'
				});
			}
		});		
	}

	function doHide(suggestBox) {
		$(document).bind('click', function() {
			suggestBox.hide()
		});
	}

	function getValue(input, suggestBox) {
		suggestBox.on('click', 'li', function() {				
			input.val($(this).html())
		});
	}
})(jQuery);
