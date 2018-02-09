function ResolveStatus(result){
    debugger;
    if(result.accepted != undefined || result == "200"){
        return 200;
    }
    else if (result.rejected != undefined || result != "200") {
        return 500;
    }
    else{
        return 404;
    }
}

module.exports = { ResolveStatus }