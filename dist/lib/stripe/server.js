'use server';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { auth } from '@/src/lib/auth';
import { stripe } from './config';
import { createOrRetrieveCustomer, getErrorRedirect, getURL } from './utils';
export function checkoutWithStripe(priceId_1) {
    return __awaiter(this, arguments, void 0, function (priceId, redirectPath) {
        var session, userId, customer, params, stripeSession, err_1, error_1;
        if (redirectPath === void 0) { redirectPath = '/settings'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, auth()];
                case 1:
                    session = _a.sent();
                    if (!session || !session.user) {
                        throw new Error('Could not get user session.');
                    }
                    userId = session.user.id;
                    return [4 /*yield*/, getCustomer(userId, session.user.email)];
                case 2:
                    customer = _a.sent();
                    params = {
                        allow_promotion_codes: true,
                        billing_address_collection: 'required',
                        customer: customer,
                        customer_update: {
                            address: 'auto'
                        },
                        line_items: [
                            {
                                price: priceId,
                                quantity: 1
                            }
                        ],
                        metadata: {
                            userId: userId
                        },
                        cancel_url: getURL(redirectPath),
                        success_url: getURL(redirectPath)
                    };
                    params = __assign(__assign({}, params), { mode: 'payment' });
                    stripeSession = void 0;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, stripe.checkout.sessions.create(params)];
                case 4:
                    stripeSession = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.error(err_1);
                    throw new Error('Unable to create checkout session.');
                case 6:
                    // Instead of returning a Response, just return the data or error.
                    if (stripeSession) {
                        return [2 /*return*/, { sessionId: stripeSession.id }];
                    }
                    else {
                        throw new Error('Unable to create checkout session.');
                    }
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        return [2 /*return*/, {
                                error: error_1.message
                            }];
                    }
                    else {
                        return [2 /*return*/, {
                                error: 'An unknown error occurred.'
                            }];
                    }
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
var getCustomer = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (userId, email) {
        var customer;
        if (userId === void 0) { userId = ''; }
        if (email === void 0) { email = ''; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createOrRetrieveCustomer({
                        userId: userId,
                        email: email
                    })];
                case 1:
                    customer = _a.sent();
                    if (!customer) {
                        throw new Error('Could not get customer.');
                    }
                    return [2 /*return*/, customer];
            }
        });
    });
};
export function createStripePortal(currentPath) {
    return __awaiter(this, void 0, void 0, function () {
        var session, customer, url, err_2, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, auth()];
                case 1:
                    session = _c.sent();
                    if (!session) {
                        throw new Error('Could not get user session.');
                    }
                    return [4 /*yield*/, getCustomer((_a = session.user) === null || _a === void 0 ? void 0 : _a.id, (_b = session.user) === null || _b === void 0 ? void 0 : _b.email)];
                case 2:
                    customer = _c.sent();
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, stripe.billingPortal.sessions.create({
                            customer: customer,
                            return_url: getURL('/')
                        })];
                case 4:
                    url = (_c.sent()).url;
                    if (!url) {
                        throw new Error('Could not create billing portal');
                    }
                    return [2 /*return*/, url];
                case 5:
                    err_2 = _c.sent();
                    console.error(err_2);
                    throw new Error('Could not create billing portal');
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _c.sent();
                    if (error_2 instanceof Error) {
                        console.error(error_2);
                        return [2 /*return*/, getErrorRedirect(currentPath, error_2.message, 'Please try again later or contact a system administrator.')];
                    }
                    else {
                        return [2 /*return*/, getErrorRedirect(currentPath, 'An unknown error occurred.', 'Please try again later or contact a system administrator.')];
                    }
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
