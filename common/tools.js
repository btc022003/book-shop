var m = {}
/**
 * 根据当前页码和总页数生成一个分页页码的数组
 * @param  {[type]} page      当前页码
 * @param  {[type]} pageCount 总页数
 * @return {[type]}           [description]
 */
m.getPagesArr = function(page,pageCount){
	page = Number(page)
	pageCount = Number(pageCount)
	var pageLength = 15 //指定页面显示的总长度
	// var pageCount =  //总页数
	// var page = 198 //当前页码
	var arrPages = [page]
	var left = page - 1 //左边
	var right = page + 1 //右边
	/**
	 * 当前页码小于等于总的页数
	 * 并且 当前的页码数组长度小于总的数组限制长度
	 * 并且 左边的页码大于0或者右边的页面小于总页数
	 */
	while(page<=pageCount && arrPages.length<pageLength && (left>0 || right<=pageCount)){
		if(left>0){
			arrPages.unshift(left)
		}
		if(right<=pageCount){
			arrPages.push(right)
		}
		left--
		right++
	}
	return arrPages
}
module.exports = m