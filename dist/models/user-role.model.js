"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const role_model_1 = require("./role.model");
const user_model_1 = require("./user.model");
let UserRole = class UserRole extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserRole.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => user_model_1.User),
    tslib_1.__metadata("design:type", String)
], UserRole.prototype, "userId", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => role_model_1.Role),
    tslib_1.__metadata("design:type", String)
], UserRole.prototype, "roleId", void 0);
UserRole = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserRole);
exports.UserRole = UserRole;
//# sourceMappingURL=user-role.model.js.map