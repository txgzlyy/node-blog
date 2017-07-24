$(function(){
	var $loginBox = $('#loginBox');
	var $registerBox = $('#registerBox');
	
	//切换到注册
	$loginBox.find('.colMint').click(()=>{
		$loginBox.hide();
		$registerBox.show()
	})
	
	//注册
	$registerBox.find("button").click(()=>{
		var username = $registerBox.find('[name="username"]').val();
		var password = $registerBox.find('[name="password"]').val();
		var repassword = $registerBox.find('[name="repassword"]').val();
		$.ajax({
			type: 'post',
			url: '/api/user/register',
			data:{
			    username : username,
			    password : password,
			    repassword: repassword
			},
			dataType: 'json',
			success: function(results){
				//console.log(results)
				$registerBox.find('.textCenter').html(results.mesages)
				if(results.code==0){
				    setTimeout(()=>{
				   	   $registerBox.hide();
		               $loginBox.show()
				    },1000)
				}
			}
		})
	})
	
	//切换到登录
	$registerBox.find('.colMint').click(()=>{
		$registerBox.hide();
		$loginBox.show()
	})
})
