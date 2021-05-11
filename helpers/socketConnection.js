require('./removeByValue')();

module.exports = function (io) {
    let userList = [];
    let userSocketId = {};
    io.on('connection', function (socket) {

        const session = socket.request.session.passport;
        const user = typeof session !== 'undefined' ? session.user : '';

        // console.log(`소켓아이디 : ${socket.id}==========`);
        if (typeof user == 'undefined')
            return;

        userSocketId[user.id] = socket.id;
        socket.on('client order', function(data){
            const socketId = userSocketId[data.user_id];
            socket.to(socketId).emit('server order');
        });
        // console.log(userSocketId);

        if (!userList.includes(user.displayname)) {
            userList.push(user.displayname);
        }

        io.emit('join', userList);

        socket.on('disconnect', function () {
            userList.removeByValue(user.displayname);
            io.emit('leave', userList);
        });

        socket.on('client message', function (data) {
            io.emit('server message', {
                message: data.message,
                displayname: user.displayname
            });
        });
    });
}