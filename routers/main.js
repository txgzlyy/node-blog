let express = require('express');

let router = express.Router();
let Fclass = require("../models/Fclass");
let Conut = require("../models/Conut");

let data ;

router.use((req,res,next)=>{
	data = {
		userInfo: req.userInfo,
		result: [],
	}
	
	Fclass.find().sort({_id: -1}).then((result)=>{
		data.result = result
		next();
	})
})

router.get('/',(req,res,next)=>{
	
	data.count = 0,
	data.page = Number(req.query.page || 1),
	data.limit =  5 ,               //  每页显示条数
    data.pages = 0,
    data.conuts = [],
    data.fclass = req.query.fclass || ''

	
    let where = {};
    
    if(data.fclass){         // 如果为空就全部显示
    	where.fclass = data.fclass     
    }
	
    Conut.where(where).count().then((count)=>{
    	
    	data.count = count;
    	data.pages = Math.ceil(data.count/data.limit);
    	// 取之不能大于 pages
    	data.page = Math.min(data.page,data.pages);
    	//取之不能小于1
    	data.page = Math.max(data.page,1);
    	
    	let skip = (data.page - 1)*data.limit    //  从哪条开始忽略
    	
    	/*
    	 *  sort({_id: -1})  
    	 *  1 是升序  默认排序
    	 */
		return Conut.find().where(where).sort({addTime: -1}).limit(data.limit).skip(skip).populate(["fclass","user"])
	}).then((Conut)=>{       // User.find()   User.count()  是异步的
		    data.conuts = Conut;
			res.render('main/index',data);
		});

})

// 阅读文章
router.get('/view',(req,res)=>{
	let contentid = req.query.contentid;
	Conut.findOne({
		_id: contentid
	}).then((content)=>{
		data.fclass = req.query.fclass || ''
		data.content = content
		res.render('main/view',data)
	})
	
})





module.exports = router