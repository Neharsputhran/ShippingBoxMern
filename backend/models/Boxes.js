const mongoose =require('mongoose');
const boxSchema = mongoose.Schema({
    name: String,
    weight:Number,
    boxcolor: String,
    country:String,
},{
    timestamps: true  //this will add createdAt and updatedAt as fields in the db
});
module.exports = mongoose.model("Boxes",boxSchema);








