const passwordHash = require('../helpers/passwordHash');

module.exports = function(sequelize, DataTypes){
    const User = sequelize.define('User', {
        id : { type : DataTypes.BIGINT.UNSIGNED, primaryKey : true, autoIncrement : true },
        username : {
            type : DataTypes.STRING,
            validate : { len : [0, 50] },
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
            validate : { len : [3, 100] },
            allowNull : false
        },
        displayname : { type : DataTypes.STRING }
    },
    {
        tableName : 'User'
    });

    User.associate = function(models){
        User.belongsToMany(models.Shops, {
            through : {
                model : 'LikesShops',
                unique : false
            },
            as : 'Likes',
            foreignKey : 'user_id',
            sourceKey : 'id',
            constraints : false
        });
    }

    User.beforeCreate(function(user, _) {
        user.password = passwordHash(user.password);
    });

    return User;
}
