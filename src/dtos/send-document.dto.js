"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SendDocumentDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var signHereDto = /** @class */ (function () {
    function signHereDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: '12344',
            description: 'documentId'
        })
    ], signHereDto.prototype, "documentId");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: '1',
            description: 'pageNumber'
        })
    ], signHereDto.prototype, "pageNumber");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: '100',
            description: 'xPosition'
        })
    ], signHereDto.prototype, "xPosition");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: '100',
            description: 'yPosition'
        })
    ], signHereDto.prototype, "yPosition");
    return signHereDto;
}());
var ResipientDto = /** @class */ (function () {
    function ResipientDto() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)(),
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: 'johnDoe@example.com',
            description: 'email'
        })
    ], ResipientDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: 'John Doe',
            description: 'name'
        })
    ], ResipientDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: '1',
            description: 'recipientId'
        })
    ], ResipientDto.prototype, "recipientId");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: '1',
            description: 'routingOrder'
        })
    ], ResipientDto.prototype, "routingOrder");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () { return signHereDto; })
    ], ResipientDto.prototype, "signHereTabs");
    return ResipientDto;
}());
var SendDocumentDto = /** @class */ (function () {
    function SendDocumentDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: '12344',
            description: 'fileId'
        })
    ], SendDocumentDto.prototype, "fileId");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: 'My Document',
            description: 'fileName'
        })
    ], SendDocumentDto.prototype, "fileName");
    __decorate([
        (0, swagger_1.ApiProperty)({
            type: [Object],
            example: [
                {
                    name: 'Ayo Falola',
                    email: 'ayofalola240@gmail.com',
                    recipientId: '1',
                    routingOrder: '1',
                    signHereTabs: [
                        {
                            documentId: '10412',
                            pageNumber: '1',
                            xPosition: '100',
                            yPosition: '100'
                        },
                    ]
                },
                {
                    name: 'John Doe',
                    email: 'myfynBoy1@gmail.com',
                    recipientId: '2',
                    routingOrder: '2'
                },
            ],
            description: 'recipients'
        }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () { return ResipientDto; })
    ], SendDocumentDto.prototype, "recipients");
    return SendDocumentDto;
}());
exports.SendDocumentDto = SendDocumentDto;
