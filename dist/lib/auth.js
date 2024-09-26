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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
//import Google from "next-auth/providers/google"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
var prisma = new PrismaClient();
var authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true
        }),
        Resend({
            from: process.env.AUTH_RESEND_FROM,
            name: 'Magic link'
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        session: function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var session = _b.session, token = _b.token;
                return __generator(this, function (_c) {
                    session.user.id = token.sub;
                    return [2 /*return*/, session];
                });
            });
        },
        authorized: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
            var auth = _b.auth;
            return __generator(this, function (_c) {
                // Logged in users are authenticated, otherwise redirect to login page
                return [2 /*return*/, !!auth];
            });
        }); },
        jwt: function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var token = _b.token, user = _b.user;
                return __generator(this, function (_c) {
                    if (user) {
                        token.sub = user.id;
                    }
                    return [2 /*return*/, token];
                });
            });
        }
    },
    cookies: {
        pkceCodeVerifier: {
            name: 'next-auth.pkce.code_verifier',
            options: {
                httpOnly: true,
                sameSite: 'none',
                path: '/',
                secure: true
            }
        }
    }
};
var nextAuth = NextAuth(authOptions);
export var handlers = (_a = NextAuth(authOptions), _a.handlers), signIn = _a.signIn, signOut = _a.signOut, auth = _a.auth;
export function getUserIdFromSession() {
    return __awaiter(this, void 0, void 0, function () {
        var session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth()];
                case 1:
                    session = _a.sent();
                    if (!session || !session.user) {
                        throw new Error('Not authenticated');
                    }
                    return [2 /*return*/, session.user.id];
            }
        });
    });
}
export function withGuard(handler, guardAction) {
    var _this = this;
    return function (data) { return __awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, guardAction(data)];
                case 1:
                    result = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, handler.apply(void 0, __spreadArray([data], result, false))];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error handling request:', error_1);
                    return [2 /*return*/, {
                            error: 'Error handling request'
                        }];
                case 5: return [2 /*return*/];
            }
        });
    }); };
}
var getUserIdFromSession2 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUserIdFromSession()];
            case 1:
                userId = _a.sent();
                return [2 /*return*/, [userId]];
        }
    });
}); };
export var withUser = function (handler) { return withGuard(handler, getUserIdFromSession2); };
