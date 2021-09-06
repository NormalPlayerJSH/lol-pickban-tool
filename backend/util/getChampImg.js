"use strict";
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
        while (_) try {
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
var axios_1 = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var request = require("request");
var lcuc = require("lcu-connector");
var fs = require("fs");
var sharp = require("sharp");
console.log(__dirname);
var lcu = new lcuc();
console.log(lcu);
lcu.start();
lcu.on("connect", function (data) {
    var port = data.port, password = data.password;
    var link = "https://riot:" + password + "@127.0.0.1:" + port;
    request(link + "/lol-champions/v1/inventories/23614482/champions", function (err, res, body) {
        //console.log(err)
        var data = JSON.parse(body);
        var ttmp;
        var tmp = data.map(function (champ) {
            return __awaiter(this, void 0, void 0, function () {
                var img;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (champ.id === -1) {
                                return [2 /*return*/];
                            }
                            parseInt;
                            return [4 /*yield*/, axios_1["default"].get(link + champ.skins[0].splashPath, {
                                    responseType: "arraybuffer"
                                })];
                        case 1:
                            img = _a.sent();
                            fs.writeFileSync(__dirname + "/beforeCrop/" + champ.alias + ".jpg", img.data);
                            sharp(__dirname + "/beforeCrop/" + champ.alias + ".jpg")
                                .extract({ left: 0, top: 0, width: 1280, height: 480 })
                                .toFile(__dirname + "/afterCrop/" + champ.alias + ".jpg", function (err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                            return [2 /*return*/, {
                                    id: champ.id,
                                    name: champ.alias,
                                    path: champ.skins[0].splashPath
                                }];
                    }
                });
            });
        });
        console.log(JSON.stringify(ttmp));
        lcu.stop();
    });
});
