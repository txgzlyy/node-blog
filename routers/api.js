let express = require('express');

let router = express.Router();

// 引入操作数据表的模型类
let User = require('../models/User')

/*
* 用户注册
*   注册逻辑
*
*   1.用户名不能为空
*   2.密码不能为空
*   3.两次输入密码必须一致
*
*   1.用户是否已经被注册了
*       数据库查询
*
* */
let responsdata;
router.use((req,res,next)=>{
	responsdata = {
		code: 0,          // 默认为0 没有错误
		mesages: ''
   };
   next();
})

// 注册验证
router.post('/user/register',(req,res,next)=>{
//	console.log(req.body)         //{ username: 'lyy', password: '123', repassword: '123' }
	let username = req.body.username;
	let password = req.body.password;
	let repassword = req.body.repassword;
	var re = /^\s+$/;
	if( username=='' || re.test(username) ){
		responsdata.code = 1;
		responsdata.mesages = "用户名不能为空！";
		res.json(responsdata);    // 向前端输出   responsdata
		return
	};
	if(password==''){
		responsdata.code = 2;
		responsdata.mesages = "密码不能为空！";
		res.json(responsdata);    // 向前端输出   responsdata
		return
	};
	if(repassword != password){
		responsdata.code = 3;
		responsdata.mesages = "两次密码不一致！";
		res.json(responsdata);    // 向前端输出   responsdata
		return
	};
	
	//  验证用户名是否在数据空中存在
	User.findOne({
		username: username
	}).then((userInfo)=>{
		//console.log(userInfo)
		if(userInfo){
			responsdata.code = 4;
			responsdata.mesages = "该用户名已经存在！";
			res.json(responsdata);    // 向前端输出   responsdata
			return;
		};
		let user = new User({
			username: username,
			password: password
		});
		return user.save();
	}).then((newUserInfo)=>{
		responsdata.mesages = "注册成功！"
		req.cookies.set('userInfo',JSON.stringify({    //  设置cookie
			_id: newUserInfo._id,
			username: newUserInfo.username
		}));
	    res.json(responsdata);
	})
});
/*
* 用户登录
*   注册逻辑
*
*   1.用户名不能为空
*   2.密码不能为空
*   
*   1.与数据库中的数据一致
*       数据库查询
*
* */
router.post('/user/login',(req,res,next)=>{
	let username = req.body.username;
	let password = req.body.password;
	if(username=='' || password==''){
		responsdata.code = 5;
		responsdata.mesages = "用户名和密码不能为空！"
	    res.json(responsdata);
	    return;
	};
	User.findOne({
		username: username,
		password: password
	}).then((userInfo)=>{
	//	console.log(userInfo)
		if(userInfo){
			responsdata.mesages = "登录成功！"
			responsdata.userInfo = {
				_id: userInfo._id,
				username: userInfo.username
			};
			req.cookies.set('userInfo',JSON.stringify({    //  设置cookie
				_id: userInfo._id,
				username: userInfo.username
			}));
	        res.json(responsdata);
		}else{
			responsdata.code = 6;
			responsdata.mesages = "用户名或密码错误！"
	        res.json(responsdata);
	        return
		}
	})
})
// 登录退出
router.get('/user/logout',(req,res,next)=>{
    req.cookies.set('userInfo',null);
    res.json(responsdata);
})


module.exports = router