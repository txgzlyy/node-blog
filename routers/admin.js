let express = require('express');

let router = express.Router();

let User = require("../models/User")

router.use((req,res,next)=>{
	if(!req.userInfo.isAdmin){
		res.send('对不起，只有管理员有权限进入！');
		return;
	};
	next()
})


// 后台首页
router.get('/',(req,res,next)=>{
	res.render('admin/index',{
		userInfo: req.userInfo
	});
});




// 用户列表
router.get('/user',(req,res,next)=>{
	/*
	 *  分页展示
	 */
	let page = req.query.page || 1;                  // 当前页
	let limit =  10                //  每页显示条数
	let pages = 0;
	
	
    User.count().then((count)=>{
    	
    	pages = Math.ceil(count/limit);
    	// 取之不能大于 pages
    	page = Math.min(page,pages);
    	//取之不能小于1
    	page = Math.max(page,1);
    	
    	let skip = (page - 1)*limit    //  从哪条开始忽略
    	
		User.find().limit(limit).skip(skip).then((users)=>{       // User.find()   User.count()  是异步的
			res.render('admin/user',{
				userInfo: req.userInfo,
				users: users,
				count: count,
				limit: limit,
				page: page,
				pages: pages
			});
		})
	});
	 
	
	
	
	
})



module.exports = router