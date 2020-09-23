function forPassword(passwordLama, passwordBaru){
    if (passwordBaru == '' || passwordBaru == null || passwordBaru == undefined){
        return passwordLama
    }
    else{
        return passwordBaru
    }
}

module.exports = forPassword