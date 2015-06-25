;(function($) {
	var defaults = {
		inputName: '#search-input',
		ajaxUrl: 'searchajax'
	};

	$.fn.autosearch = function(options) {
		var options = $.extend({}, defaults, options);
		var input = $(options.inputName);
		var suggestBox = this;


		return this.each(function() {
			input.bind('keyup', function() {
				var searchVal = $(this).val();
				doAjax(searchVal, input, suggestBox, options.ajaxUrl);				
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
				var obj = eval("("+data+")");
				var html = '<ul>';
				for(var i=0; i<obj.data.length; i++){
					html += '<li>' + obj.data[i].txt + '</li>';
				} 
				html += '</ul>';
				suggestBox.html(html);

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
		suggestBox.delegate('li', 'click', function() {				
			input.val($(this).html())
		});
	}
})(jQuery);