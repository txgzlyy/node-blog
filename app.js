let express = require('express')

let swig = require('swig') // 加载模板引擎

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


/*
 *  根据任务的不同划分模块
 */
app.use('/admin',require('./routers/admin'));  // 后台管理
//app.use('/api',require('./routers/api'));     //  API
app.use('/',require('./routers/main'));     //  前台展示








app.listen(8080,'localhost')
