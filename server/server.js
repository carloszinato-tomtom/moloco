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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const Usbmux = require('appium-ios-device');
const utilities = Usbmux.utilities;
const services = Usbmux.services;
const BARCELONA = [41.3926, 2.0701];
const app = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use(express.json());
app.listen(4001, () => console.log('MoLoCo running on port 4001'));
app.get('/getDevice', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceInfo = yield getDeviceInfo();
    return res.json({
        status: 200,
        message: 'success',
        body: JSON.stringify(deviceInfo),
    });
}));
app.post('/setLocation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceId, lat, lon } = req.body;
    console.log(` -------------------------------------> lat: ${lat}`);
    // await setDeviceLocation();
}));
function getDeviceInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const devices = yield utilities.getConnectedDevices();
        console.log(` -------------------------------------> devices: ${JSON.stringify(devices, null, '    ')}`);
        if (devices && devices.length) {
            const uuid = devices[0];
            const info = yield utilities.getDeviceInfo(uuid);
            yield setDeviceLocation(uuid, BARCELONA[0], BARCELONA[1]);
            return info;
        }
    });
}
function setDeviceLocation(uuid, lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        const locationService = yield services.startSimulateLocationService(uuid);
        console.log(` -------------------------------------> gonna try to set location `);
        // locationService.setLocation(lat, lon);
        console.log(` -------------------------------------> welcome to Barcelona `);
        locationService.resetLocation();
    });
}
getDeviceInfo();
