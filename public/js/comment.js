
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
			rendercomment(results.data.comments.reverse())
		}
	});
});

function rendercomment(comments){
	let html = ''
	comments.forEach((comment)=>{
		html += `<div class="messageBox">
                    <p class="name clear"><span class="fl">${comment.username}</span><span class="fr">${comment.commentTime}</span></p><p>${comment.content}</p>
                 </div>`
	});
	$('.messageList').html(html)
}
