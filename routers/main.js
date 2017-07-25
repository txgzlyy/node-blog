let express = require('express');

let router = express.Router();

router.get('/',(req,res,next)=>{
	res.render('main/index',{         //  分配模板的数据
		userInfo: req.userInfo,
	})
})

module.exports = router