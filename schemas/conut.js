/*
 *  定义数据库结构  
 */

let mongoose = require('mongoose');

//  定义类容表结构
let conut = new mongoose.Schema({              //  new 出来的对象 就是一个表结构
	//关联字段 - 内容分类的id
    fclass: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Fclass'
    },
    //关联字段 
    user: {
         // 作者
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //新建日期
    addTime:{
    	type: Date,
    	default: new Date()
    },
    // 阅读量
    views:{
    	type: Number,
    	default: 0
    },
    
	title: String,    //  类型 是字符串
	
    discription: {
    	type: String,
    	default: ''
    },
    main: {
    	type: String,
    	default: ''
    }
})


module.exports = conut
/*
 * 我们一般不是直接操作数据表
 * 
 * 而是通过对模型类的修改来控制表      模型类文件在  models 文件夹中
 * 
 * 
 */