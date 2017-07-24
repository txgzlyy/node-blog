let mongoose = require("mongoose");

let userSchema = require("../schemas/users");

module.exports = mongoose.model('User',userSchema);        // 创建了一个模型类    并暴露出去
