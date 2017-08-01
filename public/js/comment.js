
var limit = 3;
var page = 1;
var comments = []



$('#messageBtn').on('click',function(){
	let content = $('#messageContent').val();
	if(content==''){
		alert('类容不能为空')
		return
	}
	$.ajax({
		type:"Post",
		url:"/api/comment/post",
		data:{
			contentId: $('#contentId').val(),
			content: $('#messageContent').val()
		},
		success: function(results){
			//console.log(results)
			content: $('#messageContent').val('');
			comments = results.data.comments.reverse()
			rendercomment()
		}
	});
});


/*
 * 访问时展示
 */
$.ajax({
	type:"get",
	url:"/api/comment",
	data:{
		contentId: $('#contentId').val(),
		page: page
	},
	success: function(results){
		//console.log(results)
		comments = results.data.comments.reverse()
		rendercomment()
	}
});


$('.previous').find('a').on('click',()=>{
		page -= 1
		rendercomment()
	})
	$('.next').find('a').on('click',()=>{
		page += 1
		rendercomment()
	})





function fromDate(d){
	//console.log(d)
	let D = new Date(d)
	return D.getFullYear()+'年'+D.getMonth()+'月'+D.getDate()+'日'+D.getHours()+':'+D.getMinutes()+':'+D.getSeconds()
}


function rendercomment(){
	let html = '';
	$('#messageCount').html(comments.length);
	
	var pages = Math.ceil( comments.length/limit )     // 总页数
	var $li = $('.pager').find('li')
	if(page<=1){
		page = 1
		$('.previous').find('a').html('没有上一页')
	}else{
		$('.previous').find('a').html('上一页')
	};
	if(page>=pages){
		page = pages
		$('.next').find('a').html('没有下一页')
	}else{
		$('.next').find('a').html('下一页')
	};
	
	var star = (page - 1)*limit;
	var end = star + limit
	end = Math.min(end,comments.length)
	
	$li.eq(1).html(page+'/'+pages)
	
	if(comments.length==0){
		html = '还没有人评论！'
	}else{
		for(var i=star;i<end;i++){
			html += `<div class="messageBox">
	                    <p class="name clear"><span class="fl">${comments[i].username}</span><span class="fr">${fromDate(comments[i].commentTime)}</span></p><p>${comments[i].content}</p>
	                 </div>`
		}
	}
	
	
	$('.messageList').html(html)
}
 