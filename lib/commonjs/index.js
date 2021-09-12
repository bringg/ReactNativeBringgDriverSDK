"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Task", {
  enumerable: true,
  get: function () {
    return _task.Task;
  }
});
Object.defineProperty(exports, "TaskStatus", {
  enumerable: true,
  get: function () {
    return _task.TaskStatus;
  }
});
Object.defineProperty(exports, "Waypoint", {
  enumerable: true,
  get: function () {
    return _waypoint.Waypoint;
  }
});
Object.defineProperty(exports, "Contact", {
  enumerable: true,
  get: function () {
    return _contact.Contact;
  }
});
Object.defineProperty(exports, "Customer", {
  enumerable: true,
  get: function () {
    return _customer.Customer;
  }
});
Object.defineProperty(exports, "TaskInventory", {
  enumerable: true,
  get: function () {
    return _task_inventory.TaskInventory;
  }
});
Object.defineProperty(exports, "TaskNote", {
  enumerable: true,
  get: function () {
    return _task_note.TaskNote;
  }
});
Object.defineProperty(exports, "TransportType", {
  enumerable: true,
  get: function () {
    return _transport_type.TransportType;
  }
});
Object.defineProperty(exports, "SDKInitializeFlag", {
  enumerable: true,
  get: function () {
    return _SDKInitializeFlag.SDKInitializeFlag;
  }
});
exports.activeCustomerManager = exports.initBringgDriverSDK = void 0;

var _ios = require("./ios");

var _android = require("./android");

var _reactNative = require("react-native");

var _iosApiToPublicApiTransform = require("./ios-api-to-public-api-transform");

var _androidApiToPublicApiTransform = require("./android-api-to-public-api-transform");

var _task = require("./models/task");

var _waypoint = require("./models/waypoint");

var _contact = require("./models/contact");

var _customer = require("./models/customer");

var _task_inventory = require("./models/task_inventory");

var _task_note = require("./models/task_note");

var _transport_type = require("./models/transport_type");

var _SDKInitializeFlag = require("./consts/SDKInitializeFlag");

let bringgDriverSDK;

if (_reactNative.Platform.OS === 'ios') {
  bringgDriverSDK = (0, _iosApiToPublicApiTransform.iosAPIToPublicAPITransform)((0, _ios.getIOSNativeModule)());
} else if (_reactNative.Platform.OS === 'android') {
  bringgDriverSDK = (0, _androidApiToPublicApiTransform.androidAPIToPublicAPITransform)((0, _android.getAndroidNativeModule)());
} else {
  throw new Error('BringgDriverSDK supports iOS and Android only');
}

const {
  initBringgDriverSDK,
  activeCustomerManager
} = bringgDriverSDK;
exports.activeCustomerManager = activeCustomerManager;
exports.initBringgDriverSDK = initBringgDriverSDK;
//# sourceMappingURL=index.js.map