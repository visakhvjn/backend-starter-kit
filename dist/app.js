"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const db_config_1 = __importDefault(require("./config/db.config"));
const app = (0, express_1.default)();
// connect to database
(0, db_config_1.default)();
// for handling security vulnerabilities
// by setting HTTP headers appropriately
app.use((0, helmet_1.default)());
// for serving static files
app.use(express_1.default.static('public'));
// For views
app.set('view engine', 'ejs');
app.set('views', './views');
// for parsing input into req.body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
