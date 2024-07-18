"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const data_source_1 = require("../data-source");
const user_entity_1 = require("./user.entity");
exports.userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
