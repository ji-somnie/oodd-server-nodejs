"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import 'reflect-metadata';
const app_module_1 = require("./app.module");
const PORT = process.env.PORT || 8080;
app_module_1.httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
