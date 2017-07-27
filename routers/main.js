let express = require('express');

let router = express.Router();
let Fclass = require("../models/Fclass");

router.get('/',(req,res,next)=>{
	Fclass.find().sort({_id: -1}).then((result)=>{
		if(!result){
			
		}else{
			res.render('main/index',{         //  分配模板的数据
				userInfo: req.userInfo,
				result: result
			})
		}
		
	});
	
})

module.exports = router