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
import { stripe } from '@/src/lib/stripe/config';
import { relevantEvents } from './utils';
// const body = await req.text();
// const sig = req.headers.get('stripe-signature') as string;
// eslint-disable-next-line max-params
export function StripeCallback(body, sig, stripePriceList, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var webhookSecret, event, _a, session, userId, lineItems, _loop_1, _i, _b, item, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
                    try {
                        if (!sig || !webhookSecret)
                            return [2 /*return*/, new Response('Webhook secret not found.', { status: 400 })];
                        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
                        console.log("\uD83D\uDD14  Webhook received: ".concat(event.type));
                    }
                    catch (err) {
                        console.log("\u274C Error message: ".concat(err.message));
                        return [2 /*return*/, new Response("Webhook Error: ".concat(err.message), { status: 400 })];
                    }
                    if (!relevantEvents.has(event.type)) return [3 /*break*/, 12];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 10, , 11]);
                    _a = event.type;
                    switch (_a) {
                        case 'checkout.session.completed': return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 8];
                case 2:
                    session = event.data.object;
                    userId = (session.metadata || {})['userId'];
                    if (!userId) {
                        throw new Error('User ID is missing from the session.');
                    }
                    return [4 /*yield*/, stripe.checkout.sessions.listLineItems(session.id)];
                case 3:
                    lineItems = _c.sent();
                    _loop_1 = function (item) {
                        var priceId, quantity, price, credits;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    if (!item.price || item.price.type !== 'one_time') {
                                        return [2 /*return*/, "continue"];
                                    }
                                    priceId = item.price.id;
                                    quantity = item.quantity || 1;
                                    price = stripePriceList.find(function (price) { return price.id === priceId; });
                                    if (!price) {
                                        throw new Error("Invalid price ID. ".concat(priceId));
                                    }
                                    credits = price.credits * quantity;
                                    console.log("Adding ".concat(credits, " credits to user ").concat(userId, "."));
                                    // Add credits to the user based on the product ID and quantity
                                    return [4 /*yield*/, callback(userId, price, quantity)];
                                case 1:
                                    // Add credits to the user based on the product ID and quantity
                                    _d.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _b = lineItems.data;
                    _c.label = 4;
                case 4:
                    if (!(_i < _b.length)) return [3 /*break*/, 7];
                    item = _b[_i];
                    return [5 /*yield**/, _loop_1(item)];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 9];
                case 8: throw new Error('Unhandled relevant event!');
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _c.sent();
                    console.log(error_1);
                    return [2 /*return*/, new Response('Webhook handler failed. View your Next.js function logs.', {
                            status: 400
                        })];
                case 11: return [3 /*break*/, 13];
                case 12: return [2 /*return*/, new Response("Unsupported event type: ".concat(event.type), {
                        status: 400
                    })];
                case 13: return [2 /*return*/, new Response(JSON.stringify({ received: true }))];
            }
        });
    });
}
