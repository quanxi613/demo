/**
 * @file 表单处理
 * @author quanxi(quanxi613@126.com)
 * @date 2015-08-09
 */

var URL_SUBMIT = 'demo/form-validate/demoajax.json';

//验证处理
var fields = [
	{
		name: '#name',
		title: '姓名',
		required: true,
		maxLen: 10,
		tipEle: '#name-err'
	},
	{
		name: '#age',
		title: '年龄',
		required: true,
		tipEle: '#age-err'
	},
	{
		name: '#email',
		title: '邮箱',
		required: true,
		tipEle: '#email-err',
		validate: function(value) {
			return {
				validity: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value),
				msg: '格式有误'
			};
		}
	}
];

//显示表单错误信息
function showError(obj) {
	var fieldId = obj.fieldId;
	var tipId = obj.tipId;
	var errMsg = obj.errMsg;

	$(tipId).removeClass('hidden').html(errMsg);
	$(fieldId).addClass('error');
}

//隐藏表单错误信息
function hideError(obj) {
	var fieldId = obj.fieldId;
	var tipId = obj.tipId;

	$(tipId).addClass('hidden').html('');
	$(fieldId).removeClass('error');
}

//验证域
function checkField(field) {
	var validate = true;
	var input = field.name;
	var value = $.trim($(input).val());
	var maxLen = field.maxLen || 0;

	//验证是否必填
	if(field.required && !value) {
		validate = false;
		showError({
			fieldId: input,
			tipId: field.tipEle,
			errMsg: '必填项'
		});
		return validate;
	}

	//验证最大值
	if(maxLen && value.length > maxLen) {
		validate = false;
		showError({
			fieldId: input,
			tipId: field.tipEle,
			errMsg: '超出最大值'
		})
		return validate;
	}

	//验证格式是否正确
	if(field.validate) {
		var ret = field.validate(value);
		if(!ret.validity) {
			validate = false;
			showError({
				fieldId: input,
				tipId: field.tipEle,
				errMsg: ret.msg
			});

			return validate;
		}
	}

	hideError({
		fieldId: input,
		tipId: field.tipEle
	});

	return validate;
}

//检验所有表单项
function checkValidate() {
	var validate = true;
	$.each(fields, function (index, item) {
		if(!checkField(item)) {
			validate = false;
		}
	});
	return validate;
}

//ajax
function ajaxHandler(opt) {
	$.ajax(opt)
		.done(function (resp) {
			console.log(resp);
			console.log('注册成功');
		});
}

function initForm() {
	$.each(fields, function (index, item) {
	    var input = item.name;

	    $(input).blur(function () {
	        checkField(item);
	    });
	});

	$('.user-info').on('submit', function (e) {
		e.preventDefault();

		var varify = checkValidate() || false;

		if(varify) {
			var userInfo = $(e.target).serializeArray();
			var userObj = {url: URL_SUBMIT};
			userInfo.forEach(function (item) {
				userObj[item.name] = item.value;
			});
			ajaxHandler(userObj);
		}
	});

}

initForm();
