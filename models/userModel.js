module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        // id:{
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age:{
            type: DataTypes.INTEGER,
        },
        address:{
            type: DataTypes.TEXT,
        },
        isActive: {
            type: DataTypes.BOOLEAN
        }
    })
    return User
}