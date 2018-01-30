function ResolveStatus(result){
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

module.exports = { ResolveStatus }