const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:""
    },
    status:{
        type:String,
        required:true,
        default:"BRONZE"
    },
    safeDelete:{
        type: Boolean
      }
},
{timestamps:true}
);
const package = mongoose.model('package', packageSchema);

module.exports = package;