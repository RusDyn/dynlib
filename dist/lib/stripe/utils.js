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
import { getStripeCustomerId, updateUser } from '../db';
import { stripe } from './config';
export var relevantEvents = new Set([
    //'product.created',
    //'product.updated',
    //'product.deleted',
    //'price.created',
    //'price.updated',
    //'price.deleted',
    'checkout.session.completed'
    //'customer.subscription.created',
    //'customer.subscription.updated',
    //'customer.subscription.deleted'
]);
export var getURL = function (path) {
    var _a, _b;
    if (path === void 0) { path = ''; }
    // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
    var url = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NEXT_PUBLIC_SITE_URL) &&
        process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_SITE_URL
        : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
            ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.NEXT_PUBLIC_VERCEL_URL) &&
                process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
                ? process.env.NEXT_PUBLIC_VERCEL_URL
                : // If neither is set, default to localhost for local development.
                    'http://localhost:3000/';
    // Trim the URL and remove trailing slash if exists.
    url = url.replace(/\/+$/, '');
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : "https://".concat(url);
    // Ensure path starts without a slash to avoid double slashes in the final URL.
    path = path.replace(/^\/+/, '');
    // Concatenate the URL and the path.
    return path ? "".concat(url, "/").concat(path) : url;
};
var toastKeyMap = {
    status: ['status', 'status_description'],
    error: ['error', 'error_description']
};
var getToastRedirect = function (path, toastType, toastName, toastDescription, disableButton, arbitraryParams
// eslint-disable-next-line max-params
) {
    if (toastDescription === void 0) { toastDescription = ''; }
    if (disableButton === void 0) { disableButton = false; }
    if (arbitraryParams === void 0) { arbitraryParams = ''; }
    var _a = toastKeyMap[toastType], nameKey = _a[0], descriptionKey = _a[1];
    var redirectPath = "".concat(path, "?").concat(nameKey, "=").concat(encodeURIComponent(toastName));
    if (toastDescription) {
        redirectPath += "&".concat(descriptionKey, "=").concat(encodeURIComponent(toastDescription));
    }
    if (disableButton) {
        redirectPath += "&disable_button=true";
    }
    if (arbitraryParams) {
        redirectPath += "&".concat(arbitraryParams);
    }
    return redirectPath;
};
export var getErrorRedirect = function (path, errorName, errorDescription, disableButton, arbitraryParams
// eslint-disable-next-line max-params
) {
    if (errorDescription === void 0) { errorDescription = ''; }
    if (disableButton === void 0) { disableButton = false; }
    if (arbitraryParams === void 0) { arbitraryParams = ''; }
    return getToastRedirect(path, 'error', errorName, errorDescription, disableButton, arbitraryParams);
};
export var createOrRetrieveCustomer = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var dbStripeCustomerId, stripeCustomerId, existingStripeCustomer, stripeCustomers, stripeIdToInsert, _c, updateError_1;
    var email = _b.email, userId = _b.userId;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, getStripeCustomerId(userId)];
            case 1:
                dbStripeCustomerId = _d.sent();
                if (!dbStripeCustomerId) return [3 /*break*/, 3];
                return [4 /*yield*/, stripe.customers.retrieve(dbStripeCustomerId)];
            case 2:
                existingStripeCustomer = _d.sent();
                if (existingStripeCustomer) {
                    stripeCustomerId = existingStripeCustomer.id;
                }
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, stripe.customers.list({ email: email })];
            case 4:
                stripeCustomers = _d.sent();
                stripeCustomerId =
                    stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined;
                _d.label = 5;
            case 5:
                if (!stripeCustomerId) return [3 /*break*/, 6];
                _c = stripeCustomerId;
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, createCustomerInStripe(userId, email)];
            case 7:
                _c = _d.sent();
                _d.label = 8;
            case 8:
                stripeIdToInsert = _c;
                if (!stripeIdToInsert)
                    throw new Error('Stripe customer creation failed.');
                if (!stripeCustomerId) return [3 /*break*/, 13];
                if (!(dbStripeCustomerId !== stripeCustomerId)) return [3 /*break*/, 12];
                _d.label = 9;
            case 9:
                _d.trys.push([9, 11, , 12]);
                return [4 /*yield*/, updateUser(userId, { stripeCustomerId: stripeCustomerId })];
            case 10:
                _d.sent();
                return [3 /*break*/, 12];
            case 11:
                updateError_1 = _d.sent();
                throw new Error("Db customer record update failed: ".concat(updateError_1));
            case 12: 
            // If db has a record and matches Stripe, return Stripe customer ID
            return [2 /*return*/, stripeCustomerId];
            case 13: 
            // If db has no record, create a new record and return Stripe customer ID
            return [4 /*yield*/, updateUser(userId, { stripeCustomerId: stripeIdToInsert })];
            case 14:
                // If db has no record, create a new record and return Stripe customer ID
                _d.sent();
                return [2 /*return*/, stripeIdToInsert];
        }
    });
}); };
var createCustomerInStripe = function (userId, email) { return __awaiter(void 0, void 0, void 0, function () {
    var customerData, newCustomer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                customerData = { metadata: { userId: userId }, email: email };
                return [4 /*yield*/, stripe.customers.create(customerData)];
            case 1:
                newCustomer = _a.sent();
                if (!newCustomer) {
                    throw new Error('Stripe customer creation failed.');
                }
                return [2 /*return*/, newCustomer.id];
        }
    });
}); };
