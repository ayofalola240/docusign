"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var AuthDto = /** @class */ (function () {
    function AuthDto() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAaVpY7xfbSAgAgNEeuvcX20gCAOQxgKcKAhNNroyl4e2_kQwVAAEAAAAYAAIAAAAFAAAAHQAAAA0AJAAAADc2NWNmMTFjLWRhODEtNDkxYi1iMGE1LTc3OTI3N2RmNDBkZSIAJAAAADc2NWNmMTFjLWRhODEtNDkxYi1iMGE1LTc3OTI3N2RmNDBkZRIAAQAAAAYAAABqd3RfYnIjACQAAAA3NjVjZjExYy1kYTgxLTQ5MWItYjBhNS03NzkyNzdkZjQwZGU',
            description: 'Access Token'
        })
    ], AuthDto.prototype, "accessToken");
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: '93b82949-e460-4615-8bbd-da279663ff0f',
            description: 'Api account Id'
        })
    ], AuthDto.prototype, "apiAccountId");
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: 'https://demo.docusign.net/restapi',
            description: 'Base path'
        })
    ], AuthDto.prototype, "basePath");
    return AuthDto;
}());
exports.AuthDto = AuthDto;
