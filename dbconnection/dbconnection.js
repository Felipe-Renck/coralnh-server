var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://vertical:DataBaseVertical2018@vertical-shard-00-00-hfy8w.mongodb.net:27017/janh?ssl=true&replicaSet=Vertical-shard-0&authSource=admin");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function NewLog(err) {
    var logSchema = new Schema({
        type: String,
        dateTime: Date,
        error: String
    })

    var Log = mongoose.model('Log', logSchema);
    var log = new Log({ type:'email', dateTime:new Date(), error:err });

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        log.save();
    });
}

module.exports = {NewLog};