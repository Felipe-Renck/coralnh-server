var db = require('../dbconnection/dbconnection.js')

function CreateLog(error){
    db.NewLog(error);
}

module.exports = {CreateLog};