$.ajaxSetup({
	dataType: 'json',
	timeout:5000,
	complete:function(cmp){
		// console.log('ajax请求完成')
		// console.log(cmp)
	}
})
$(function(){
	var href = window.location.href
	if(href.indexOf('/books/')>-1){
		$('.weui-tabbar__item').eq(0).addClass('weui-bar__item_on')
	}
	else{
		$('.weui-tabbar__item').eq(1).addClass('weui-bar__item_on')
	}
})