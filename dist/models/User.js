"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const userSchema = {
    id: 'user',
    properties: {
        username: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    },
    additionalProperties: false
};
class User extends models_1.default {
    constructor(props, required) {
        super(props, userSchema, required);
    }
}
exports.default = User;
