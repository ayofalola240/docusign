"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.DocusignService = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
var common_1 = require("@nestjs/common");
var fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
var docusign = require('docusign-esign');
// eslint-disable-next-line @typescript-eslint/no-var-requires
var jwtConfig_json_1 = require("../../jwtConfig.json");
var DocusignService = /** @class */ (function () {
    function DocusignService() {
        this.client = new docusign.ApiClient();
        this.SCOPES = ['signature', 'impersonation'];
    }
    DocusignService.prototype.getConsent = function () {
        var urlScopes = this.SCOPES.join('+');
        // Construct consent URL
        var redirectUri = 'https://developers.docusign.com/platform/auth/consent';
        var consentUrl = "".concat(jwtConfig_json_1["default"].dsOauthServer, "/oauth/auth?response_type=code&") +
            "scope=".concat(urlScopes, "&client_id=").concat(jwtConfig_json_1["default"].dsJWTClientId, "&") +
            "redirect_uri=".concat(redirectUri);
        console.log('Open the following URL in your browser to grant consent to the application:');
        return consentUrl;
    };
    DocusignService.prototype.authenticate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jwtLifeSec, rsaKey, results, accessToken, userInfoResults, userInfo, error_1, body, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        jwtLifeSec = 10 * 60;
                        this.client.setOAuthBasePath(jwtConfig_json_1["default"].dsOauthServer.replace('https://', ''));
                        rsaKey = fs.readFileSync(jwtConfig_json_1["default"].privateKeyLocation);
                        return [4 /*yield*/, this.client.requestJWTUserToken(jwtConfig_json_1["default"].dsJWTClientId, jwtConfig_json_1["default"].impersonatedUserGuid, this.SCOPES, rsaKey, jwtLifeSec)];
                    case 1:
                        results = _a.sent();
                        accessToken = results.body.access_token;
                        return [4 /*yield*/, this.client.getUserInfo(accessToken)];
                    case 2:
                        userInfoResults = _a.sent();
                        userInfo = userInfoResults.accounts.find(function (account) { return account.isDefault === 'true'; });
                        console.log(userInfo);
                        return [2 /*return*/, {
                                accessToken: results.body.access_token,
                                apiAccountId: userInfo.accountId,
                                basePath: "".concat(userInfo.baseUri, "/restapi")
                            }];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        body = error_1.response && error_1.response.body;
                        if (body) {
                            // The user needs to grant consent
                            if (body.error && body.error === 'consent_required') {
                                return [2 /*return*/, { consentUrl: this.getConsent() }];
                            }
                            else {
                                errorMessage = "\nAPI problem: Status code ".concat(error_1.response.status, ", message body:\n        ").concat(JSON.stringify(body, null, 4), "\n\n");
                                console.log(errorMessage);
                                throw new common_1.BadRequestException(errorMessage);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DocusignService.prototype.sendDocument = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var accountInfo, fileId, fileName, recipients, error_2, accessToken, basePath, apiAccountId, envDef, filePath, fileContent, pdfDoc, reminders, notification, expirations, envelopesApi, envelopeSummary, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileId = body.fileId, fileName = body.fileName, recipients = body.recipients;
                        if (!fileId) {
                            fileId = '74581';
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.authenticate()];
                    case 2:
                        accountInfo = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        accessToken = accountInfo.accessToken, basePath = accountInfo.basePath, apiAccountId = accountInfo.apiAccountId;
                        this.client.setBasePath(basePath);
                        this.client.addDefaultHeader('Authorization', "Bearer ".concat(accessToken));
                        envDef = new docusign.EnvelopeDefinition();
                        envDef.emailSubject = 'Please sign this document';
                        envDef.emailBlurb = 'Please sign this document';
                        filePath = path.join(process.cwd(), "./uploads/".concat(fileId, ".pdf"));
                        fileContent = fs.readFileSync(filePath);
                        pdfDoc = new docusign.Document();
                        pdfDoc.documentBase64 = fileContent.toString('base64');
                        pdfDoc.name = "".concat(fileName, ".pdf");
                        pdfDoc.fileExtension = 'pdf';
                        pdfDoc.documentId = fileId;
                        envDef.documents = [pdfDoc];
                        reminders = new docusign.Reminders();
                        reminders.reminderEnabled = 'true';
                        reminders.reminderDelay = 1; // number of days to wait before sending first reminders
                        reminders.reminderFrequency = 1; // number of days between reminders
                        reminders.reminderNote = 'Please sign the document as soon as possible.';
                        notification = new docusign.Notification();
                        notification.useAccountDefaults = 'false';
                        expirations = new docusign.Expirations();
                        expirations.expireEnabled = 'true';
                        expirations.expireAfter = '30'; // envelope will expire after 30 days
                        expirations.expireWarn = '2'; // expiration reminder would be sent two days before expiration
                        notification.expirations = expirations;
                        notification.reminders = reminders;
                        envDef.notification = notification;
                        envDef.recipients = new docusign.Recipients();
                        envDef.recipients.signers = recipients;
                        envDef.status = 'sent';
                        envelopesApi = new docusign.EnvelopesApi(this.client);
                        return [4 /*yield*/, envelopesApi.createEnvelope(apiAccountId, {
                                envelopeDefinition: envDef
                            })];
                    case 5:
                        envelopeSummary = _a.sent();
                        return [2 /*return*/, envelopeSummary];
                    case 6:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw new common_1.BadRequestException(error_3.message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DocusignService = __decorate([
        (0, common_1.Injectable)()
    ], DocusignService);
    return DocusignService;
}());
exports.DocusignService = DocusignService;
