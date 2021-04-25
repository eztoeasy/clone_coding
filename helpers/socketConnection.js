require('./removeByValue')();

module.exports = function (io) {
    let userList = [];
    io.on('connection', function (socket) {

        const session = socket.request.session.passport;
        const user = typeof session !== 'undefined' ? session.user : '';

        if (!userList.includes(user.displayname)){
            userList.push(user.displayname);
        }

        io.emit('join', userList);
        
        socket.on('disconnect', function(){
            userList.removeByValue(user.displayname);
            io.emit('leave', userList);
        });

        socket.on('client message', function (data) {
            io.emit('server message', {
                message : data.message,
                displayname : user.displayname
            });
        });
    });
}