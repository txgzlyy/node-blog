let mongoose = require("mongoose");

let conutSchema = require("../schemas/conut");

module.exports = mongoose.model('Conut',conutSchema);        // 创建了一个模型类    并暴露出去
