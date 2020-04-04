function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.send({
        isAuthenticated: false
    });
}

module.exports = isAuthenticated;