/**
 * @file 分页
 * @author quanxi(quanxi613@126.com)
 *         
 */
 ;(function($) {
 	var defaults = {
 		pagecurrent: 1,
 		pagecount:1,
 		first_text: '首页',
 		prev_text: '上一页',
 		next_text: '下一页',
 		last_text: '尾页',
 		max_per_page: 10
 	};

 	$.fn.pager = function(options) {
 		var options = $.extend({}, defaults, options);
 		
 		return this.each(function() {
 			$(this).empty().append(renderPage(options));
 		});
 	}

 	function renderPage(opts) {
 		var pagecurrent = parseInt(opts.pagecurrent);
 		var pagecount = parseInt(opts.pagecount);
 		var btncallback = opts.btncallback;
 		var max_per_page = parseInt(opts.max_per_page);
 		var first_text = opts.first_text;
 		var prev_text = opts.prev_text;
 		var next_text = opts.next_text;
 		var last_text = opts.last_text;
 		//页码wrap
 		var pageWrap = $('<ul class="page"></ul>');
 		//添加第一页和上一页按钮
 		pageWrap.append(renderBtn('first', first_text, pagecurrent, pagecount, btncallback))
 		.append(renderBtn('prev',prev_text, pagecurrent, pagecount, btncallback));

 		//控制一屏最多显示n条页码
 		var startNum = 1;
 		var endNum = max_per_page;
 		var point = Math.ceil((endNum - startNum) / 2);

 		if (pagecurrent > point) {
 			startNum = pagecurrent - point;
 			endNum = pagecurrent + point;
 		}

 		if (endNum > pagecount) {
 			startNum = pagecount - max_per_page + 1;
 			endNum = pagecount;
 		}

 		if (startNum < 1) {
 			startNum = 1;
 		}
 		//渲染页码列表
 		for (var pagenumber = startNum; pagenumber <= endNum; pagenumber++) {
 			var pagebtn = $('<li>'+ pagenumber +'</li>');
 			if (pagenumber == pagecurrent) {
 				pagebtn.addClass('current');
 			}
 			else {
 				pagebtn.click(function() {
 					btncallback(this.innerHTML);
 				});
 			}
 			pageWrap.append(pagebtn);
 		}

 		//渲染下一页和尾页按钮
 		pageWrap.append(renderBtn('next', next_text, pagecurrent, pagecount, btncallback))
 		.append(renderBtn('last', last_text, pagecurrent, pagecount, btncallback));

 		return pageWrap;
 	}

 	function renderBtn(btntype, btntext, pagecurrent, pagecount, btncallback) {
 		var button = $('<li>'+ btntext +'</li>');

 		var destPage = 1;

 		switch (btntype) {
 			case 'first':
 				destPage = 1;
 				break;
 			case 'prev':
 				destPage = pagecurrent - 1;
 				break;
 			case 'next':
 				destPage = pagecurrent + 1;
 				break;
 			case 'last':
 				destPage = pagecount;
 		}

 		if (btntype == 'first' || btntype == 'prev') {
 			if (pagecurrent <= 1) {
 				button.addClass('disable');
 			}
 			else {
 				button.click(function() {
 					btncallback(destPage);
 				});
 			}
 		}
 		else {
 			if (pagecurrent >= pagecount) {
 				button.addClass('disable');
 			}
 			else {
 				button.click(function() {
 					btncallback(destPage);
 				});
 			}
 		}

 		return button;
 	}

 })(jQuery);