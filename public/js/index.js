$(function(){
	var $loginBox = $('#loginBox');
	var $registerBox = $('#registerBox');
	var $userInfo = $('#userInfo')
	
	//切换到注册
	$loginBox.find('.colMint').click(()=>{
		$loginBox.hide();
		$registerBox.show()
	})
	
	//切换到登录
	$registerBox.find('.colMint').click(()=>{
		$registerBox.hide();
		$loginBox.show()
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
	// 登录
	$loginBox.find("button").on('click',()=>{
		var username = $loginBox.find('[name="username"]').val();
		var password = $loginBox.find('[name="password"]').val();
		$.ajax({
			type: 'post',
			url: '/api/user/login',
			data: {
			   username: username,
			   password: password
			},
			dataType: 'json',
			success(results){
				//console.log(results)
				$loginBox.find('.textCenter').html(results.mesages)
				if(results.code==0){
					setTimeout(()=>{
						$loginBox.hide()
					    $userInfo.show()
					    $userInfo.find('.username').html(results.userInfo.username);
					    $userInfo.find('.info').html('你好，欢迎光临我的博客')
				    },1000)
				}
			}
		})
	})
	
})
