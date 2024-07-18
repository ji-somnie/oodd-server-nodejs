"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source initialized');
})
    .catch((err) => {
    console.error('Error during initialization:', err);
});
