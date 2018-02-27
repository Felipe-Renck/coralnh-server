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
    debugger;
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

module.exports = { ResolveStatusEmail, ResolveStatusMongo }