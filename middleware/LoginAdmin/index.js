function LoginAdmin(req, res, next) {
    console.log(req.user);
    next();
}

module.exports = LoginAdmin;