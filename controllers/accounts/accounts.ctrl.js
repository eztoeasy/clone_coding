const models = require('../../models');

exports.get_join = function(_, res){
    res.render('accounts/join.html');
}

exports.post_join = async function (req, res) {
    try {
        await models.User.create(req.body);
        res.send('<script>alert("회원가입 성공");\ location.href="/accounts/login"</script>');
    } catch (error) {

    }
}

exports.get_login = function(req, res){
    res.render('accounts/login.html', { flashMessage : req.flash().error });
}

exports.post_login = function(_, res){
    res.send('<script>alert("로그인 성공");\
    location.href = "/accounts/success";</script>');
}

exports.get_success = function(req, res){
    res.send(req.user);
}

exports.get_logout = function(req, res){
    req.logout();
    res.redirect('/accounts/login');
}