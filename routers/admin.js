let express = require('express');

let router = express.Router();

let User = require("../models/User");
let Fclass = require("../models/Fclass");
let Conut = require("../models/Conut");

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
router.get('/fclass/index',(req,res,next)=>{
	/*
	 *  分页展示
	 */
	let page = req.query.page || 1;                  // 当前页
	let limit =  10                //  每页显示条数
	let pages = 0;
	
	
    Fclass.count().then((count)=>{
    	
    	pages = Math.ceil(count/limit);
    	// 取之不能大于 pages
    	page = Math.min(page,pages);
    	//取之不能小于1
    	page = Math.max(page,1);
    	
    	let skip = (page - 1)*limit    //  从哪条开始忽略
    	
    	/*
    	 *  sort({_id: -1})  
    	 *  1 是升序  默认排序
    	 */
    
    	
		Fclass.find().sort({_id: -1}).limit(limit).skip(skip).then((Fclass)=>{       // User.find()   User.count()  是异步的
			res.render('admin/fclass_index',{
				userInfo: req.userInfo,
				fclasses: Fclass,
				count: count,
				limit: limit,
				page: page,
				pages: pages
			});
		})
	});	
});

// 添加分类
router.get('/fclass/add',(req,res,next)=>{
	res.render('admin/fclass_add',{
		userInfo: req.userInfo
	});
});

router.post('/fclass/add',(req,res)=>{
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
			url: '/admin/fclass/add'
		}) 
	})
});

/*
 * 分类修改
 */

router.get('/fclass/edit',(req,res)=>{
	
	Fclass.findById(req.query.id).then((fclass)=>{
		if(!fclass){
			res.render('admin/error',{
				userInfo: req.userInfo,
				mesages: '该记录不存在！'
			});
		}else{
			res.render('admin/fclass_edit',{
				userInfo: req.userInfo,
				name: fclass.name
			});
		}
	})
});
/*
 * 修改保存
 */
router.post('/fclass/edit',(req,res)=>{
	let name = req.body.name;   //   req.body.name 修改之后提交过来的
	let id = req.query.id || '';
	//console.log(req.query.id)
	Fclass.findOne({
		_id: id
	}).then((rs)=>{
		if(!rs){
			res.render('admin/error',{
				userInfo: req.userInfo,
				mesages: '该数据不存在！'
			});
			return Promise.reject()
		}else{
			if(name == rs.name){      // 没有做任何修改提交
				res.render('admin/success',{
					userInfo: req.userInfo,
					mesages: '分类修改成功！',
					url: '/admin/fclass/index'
				}) 
				return Promise.reject()
			}else{
				//  判断修改后的名字是否在数据库中其他数据有同样的名字
				Fclass.findOne({     // id 不同  名字相同
					_id: {$ne:id},
					name: name  
				}).then((newrs)=>{
					if(newrs){
						res.render('admin/error',{
							userInfo: req.userInfo,
							mesages: '该名称已存在！'
						});
						return Promise.reject()
					}else{
						return Fclass.update({
							_id: id
						},{
							name: name
						})
					}
				}).then(()=>{
					res.render('admin/success',{
						userInfo: req.userInfo,
						mesages: '分类修改成功！',
						url: '/admin/fclass/index'
					}) 
				})
			}
		}
	})
});

// 删除数据
router.get('/fclass/dele',(req,res)=>{
	//    Fclass.remove  删除方法
	Fclass.remove({_id: req.query.id}).then(()=>{
		res.render('admin/success',{
			userInfo: req.userInfo,
			mesages: '删除成功！',
			url: '/admin/fclass/index'
		})
	})
});

/*
 * 类容管理
 */
router.get('/conut',(req,res)=>{
	/*
	 *  分页展示
	 */
	let page = req.query.page || 1;                  // 当前页
	let limit =  10                //  每页显示条数
	let pages = 0;
	
	
    Conut.count().then((count)=>{
    	
    	pages = Math.ceil(count/limit);
    	// 取之不能大于 pages
    	page = Math.min(page,pages);
    	//取之不能小于1
    	page = Math.max(page,1);
    	
    	let skip = (page - 1)*limit    //  从哪条开始忽略
    	
    	/*
    	 *  sort({_id: -1})  
    	 *  1 是升序  默认排序
    	 */
		Conut.find().sort({_id: -1}).limit(limit).skip(skip).populate(["fclass","user"]).then((Conut)=>{       // User.find()   User.count()  是异步的
		
			res.render('admin/conut_index',{
				userInfo: req.userInfo,
				conuts: Conut,
				count: count,
				limit: limit,
				page: page,
				pages: pages
			});
		})
	});	
});
/*
 * 添加类容
 */
router.get('/conut/add',(req,res)=>{
	Fclass.find().then((rs)=>{
		if(!rs){
			
		}else{
			res.render('admin/conut_add',{
				userInfo: req.userInfo,
				Fclasses: rs
			})
		}
	})
});

// 保存内容
router.post('/conut/add',(req,res)=>{
      // console.log(req.body)
    if(!req.body.fclass){
    	res.render('admin/error',{
			userInfo: req.userInfo,
			mesages: '分类不能为空！'
		});
		return
    }
    if(!req.body.title){
    	res.render('admin/error',{
			userInfo: req.userInfo,
			mesages: '标题不能为空！'
		});
		return
    }
    if(!req.body.discription){
    	res.render('admin/error',{
			userInfo: req.userInfo,
			mesages: '简介不能为空！'
		});
		return
    }
    if(!req.body.main){
    	res.render('admin/error',{
			userInfo: req.userInfo,
			mesages: '内容不能为空！'
		});
		return
    }
     
       
    Conut.findOne(req.body).then((conut)=>{
    	
    	if(conut){
    		res.render('admin/error',{
				userInfo: req.userInfo,
				mesages: '该记录已存在！'
			});
			return Promise.reject()
    	}else{
    		return new Conut({
    			fclass: req.body.fclass,
		    	title: req.body.title,
		    	discription: req.body.discription,
		    	main: req.body.main,
		    	user: req.userInfo._id.toString()
    		}).save()
    	}
    }).then(()=>{
    	res.render('admin/success',{
			userInfo: req.userInfo,
			mesages: '添加类容成功！'
		})
    })
});

// 修改内容
router.get('/conut/edit',(req,res)=>{
	let id = req.query.id || '';
	let fclasses = [];
	Fclass.find().then((rs)=>{
		if(!rs){
			res.render('admin/error',{
				userInfo: req.userInfo,
				mesages: '该记录不存在！'
			});
			return Promise.reject()
		}
		fclasses = rs;
		return Conut.findOne({
				_id: id
		}).populate('fclass');
	}).then((count)=>{
		if(!count){
			res.render('admin/error',{
				userInfo: req.userInfo,
				mesages: '该条类容不存在！'
			})
			return Promise.reject()
		}else{
			res.render('admin/conut_edit',{
				userInfo: req.userInfo,
				fclasses: fclasses,
				count: count
			})
		}
	})
});
// 保存修改类容
router.post('/conut/edit',(req,res)=>{
	let id = req.query.id;
	Conut.update({
		_id:id
	},req.body).then(()=>{
		res.render('admin/success',{
			userInfo: req.userInfo,
			mesages: '编辑类容成功！',
			url: '/admin/conut'
		})
	})
})

// 删除内容
router.get('/conut/dele',(req,res)=>{
	let id = req.query.id;
	Conut.remove({
		_id:id
	}).then(()=>{
		res.render('admin/success',{
			userInfo: req.userInfo,
			mesages: '删除类容成功！',
			url: '/admin/conut'
		})
	})
})


module.exports = router