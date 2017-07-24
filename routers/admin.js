let express = require('express');

let router = express.Router();

router.get('/user',(req,res,next)=>{
	res.render('../views/user')
})

module.exports = router