const Sequelize = require("sequelize");

module.exports = {
    name: 'languages',
    structure: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        extension: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: this.name,
        freezeTableName: false,
        timestamps: false
    }
};
