
var users = {
    admin:   {id : 1, username : 'admin',    password : 'admin'},
    ifreiref: {id : 2, username : 'ifreiref', password : '111111'}
};

exports.autenticar = function(login, password, callback) {
    
    if (users[login]) {
        if (password === users[login].password) {
            callback(null, users[login]);
        } else {
            callback(new Error('Password Incorrecto.'));
        }
    } else {
        callback(new Error('No Existe Usuario.'));
    }
}
