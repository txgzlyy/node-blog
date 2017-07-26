let express = require('express');

let router = express.Router();

let User = require("../models/User");
let Fclass = require("../models/Fclass");

router.use((req,res,next)=>{
	//console.log(req.userInfo)
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
});

// 分类管理
router.get('/fclass_index',(req,res,next)=>{
	res.render('admin/fclass_index',{
		userInfo: req.userInfo
	});
});

// 添加分类
router.get('/fclass_add',(req,res,next)=>{
	res.render('admin/fclass_add',{
		userInfo: req.userInfo
	});
});

router.post('/fclass_add',(req,res)=>{
	let name = req.body.name;
	Fclass.findOne({
		name:name
	}).then((rs)=>{
		if(rs){
			// 数据库中已有该数据
			res.render('admin/error',{
				userInfo: req.userInfo,
				mesages: '该分类已存在！'
			}) 
			return Promise.reject(); // 返回  Promise.reject()对象
		};
		//没有就保存
		return new Fclass({
			name: name
		}).save();
	}).then((newFclass)=>{
		res.render('admin/success',{
			userInfo: req.userInfo,
			mesages: '分类添加成功！',
			url: '/admin/fclass_add'
		}) 
	})
});



module.exports = router