let express = require('express')

let swig = require('swig') // 加载模板引擎

let mongoose = require("mongoose");    // 架子数据库模块

let bodyparser = require("body-parser");   

let app = express();

// 设置静态文件托管    只要url中出现  /public  就执行
app.use('/public',express.static(__dirname + '/public'))

//定义模板 引擎
app.engine('html',swig.renderFile);
// 设置模板文件存放地址
app.set('views','./views');
// 注册定义好的模板
app.set('view engine','html')
//  取消模板缓存
swig.setDefaults({cache: false});
// body-pass 设置
app.use(bodyparser.urlencoded({extended:true}))



/*
 *  根据任务的不同划分模块
 */
app.use('/admin',require('./routers/admin'));  // 后台管理
app.use('/api',require('./routers/api'));     //  API
app.use('/',require('./routers/main'));     //  前台展示



app.engine('html',swig.renderFile);  
mongoose.connect('mongodb://localhost:27017/newblog',(err)=>{
	if(err){
		console.log('数据库连接失败！');
	}else{
		console.log('数据库连接成功');
		app.listen(8080)
	}
})




