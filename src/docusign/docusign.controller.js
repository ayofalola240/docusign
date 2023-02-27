"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.DocusignController = exports.uploadFile = exports.FileIdDto = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var multer_1 = require("multer");
var path_1 = require("path");
var auth_dto_1 = require("../dtos/auth.dto");
var envelop_dto_1 = require("../dtos/envelop.dto");
var file_helper_1 = require("../../utils/file-helper");
var FileIdDto = /** @class */ (function () {
    function FileIdDto() {
    }
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, swagger_1.ApiProperty)({
            type: String,
            example: '12344',
            description: 'File Id'
        })
    ], FileIdDto.prototype, "FileId");
    return FileIdDto;
}());
exports.FileIdDto = FileIdDto;
var uploadFile = function (fileName) {
    if (fileName === void 0) { fileName = 'file'; }
    return function (target, propertyKey, descriptor) {
        var _a;
        (0, swagger_1.ApiBody)({
            schema: {
                type: 'object',
                properties: (_a = {},
                    _a[fileName] = {
                        type: 'string',
                        format: 'binary'
                    },
                    _a)
            }
        })(target, propertyKey, descriptor);
    };
};
exports.uploadFile = uploadFile;
var DocusignController = /** @class */ (function () {
    function DocusignController(docusignService) {
        this.docusignService = docusignService;
    }
    DocusignController.prototype.getAuth = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.docusignService.authenticate()];
                    case 1:
                        body = _a.sent();
                        if (body && body.consentUrl) {
                            req.redirect(body.consentUrl);
                        }
                        return [2 /*return*/, body];
                }
            });
        });
    };
    DocusignController.prototype.uploadFile = function (file, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (!file || req.fileValidationError) {
                        throw new common_1.BadRequestException('Only PDF files are allowed!');
                    }
                    return [2 /*return*/, {
                            message: 'File successfully uploaded',
                            FileID: file.filename.split('.')[0]
                        }];
                }
                catch (error) {
                    throw new common_1.BadRequestException(error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    DocusignController.prototype.sendDocument = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.docusignService.sendDocument(body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Get authorization details' }),
        (0, swagger_1.ApiCreatedResponse)({
            type: auth_dto_1.AuthDto
        }),
        (0, swagger_1.ApiBadRequestResponse)({ description: 'consent_required' }),
        (0, common_1.Get)('/auth'),
        __param(0, (0, common_1.Request)())
    ], DocusignController.prototype, "getAuth");
    __decorate([
        (0, swagger_1.ApiConsumes)('multipart/form-data'),
        (0, swagger_1.ApiOperation)({ summary: 'Upload pdf Document to be sent to docusign' }),
        (0, swagger_1.ApiOkResponse)({
            description: 'File successfully uploaded',
            type: FileIdDto
        }),
        (0, swagger_1.ApiBadRequestResponse)({ description: 'Only PDF files are allowed!' }),
        (0, exports.uploadFile)('file'),
        (0, common_1.Post)('upload'),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
            storage: (0, multer_1.diskStorage)({
                destination: './uploads',
                filename: function (req, file, cb) {
                    var uniqueId = Math.floor(10000 + Math.random() * 90000);
                    var extension = (0, path_1.extname)(file.originalname);
                    cb(null, uniqueId + extension);
                }
            }),
            fileFilter: file_helper_1.imageFileFilter,
            limits: {
                fileSize: 1024 * 1024 * 5
            }
        })),
        __param(0, (0, common_1.UploadedFile)()),
        __param(1, (0, common_1.Req)())
    ], DocusignController.prototype, "uploadFile");
    __decorate([
        (0, common_1.Post)('/send-document'),
        (0, swagger_1.ApiOperation)({ summary: 'Send Document to docusign' }),
        (0, swagger_1.ApiOkResponse)({
            type: envelop_dto_1.EnvelopeDto
        }),
        __param(0, (0, common_1.Body)())
    ], DocusignController.prototype, "sendDocument");
    DocusignController = __decorate([
        (0, common_1.Controller)('docusign')
    ], DocusignController);
    return DocusignController;
}());
exports.DocusignController = DocusignController;
