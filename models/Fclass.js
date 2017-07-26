let mongoose = require("mongoose");

let fclassSchema = require("../schemas/fclass");

module.exports = mongoose.model('Fclass',fclassSchema);        // 创建了一个模型类    并暴露出去
