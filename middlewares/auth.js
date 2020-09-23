function auth(req, res, next){
    if (req.session.renterId){
        next()
    }
    else{
        res.redirect('/')
    }
}

module.exports = auth