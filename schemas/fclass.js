/*
 *  定义数据库结构  
 */

let mongoose = require('mongoose');

//  定义用户表
let schema = new mongoose.Schema({              //  new 出来的对象 就是一个表结构
	// 分类名
	name: String,    //  类型 是字符串

})


module.exports = schema
/*
 * 我们一般不是直接操作数据表
 * 
 * 而是通过对模型类的修改来控制表      模型类文件在  models 文件夹中
 * 
 * 
 */