const { DataTypes } = require('sequelize');

module.exports = sequelize => (
    sequelize.define('Book', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
)