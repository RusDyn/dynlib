'use client';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Crisp } from 'crisp-sdk-web';
import { Component } from 'react';
var CrispChat = /** @class */ (function (_super) {
    __extends(CrispChat, _super);
    function CrispChat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrispChat.prototype.componentDidMount = function () {
        var id = process.env.NEXT_PUBLIC_CRISP_CHAT_ID;
        if (!id) {
            return;
        }
        Crisp.configure(id);
    };
    CrispChat.prototype.render = function () {
        return null;
    };
    return CrispChat;
}(Component));
function CrispButton(_a) {
    var label = _a.label;
    var onClick = function () {
        Crisp.chat.show();
        Crisp.chat.open();
    };
    return <div onClick={onClick}>{label || 'Support'}</div>;
}
export { CrispButton, CrispChat };
