function ResolveStatusEmail(result){
    debugger;
    if(result.accepted != undefined){
        return 200;
    }
    else if (result.rejected != undefined) {
        return 500;
    }
    else{
        return 404;
    }
}

function ResolveStatusMongo(result){
    if (result == "11000"){
        return "11000";
    }
    else if(result == "200"){
        return "200";
    }
    else if (result == "500") {
        return "500";
    }
    else{
        return "404";
    }
}

function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

function generate() {
    myform.row_password.value = randomPassword(myform.length.value);
}

module.exports = { ResolveStatusEmail, ResolveStatusMongo }