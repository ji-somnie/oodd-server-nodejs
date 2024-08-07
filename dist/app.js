"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import 'reflect-metadata';
const app_module_1 = __importDefault(require("./app.module"));
const data_source_1 = require("./data-source");
data_source_1.myDataBase
    .initialize()
    .then(() => {
    console.log('DataBase has been initialized!');
})
    .catch(err => {
    console.error('Error during DataBase initialization:', err);
});
const PORT = process.env.PORT || 8080;
data_source_1.myDataBase
    .initialize()
    .then(() => {
    app_module_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch(error => console.log(error));
