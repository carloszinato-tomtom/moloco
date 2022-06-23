import { Express } from 'express'
const express = require('express');
const Usbmux = require('appium-ios-device');
const utilities = Usbmux.utilities;
const services = Usbmux.services;

const BARCELONA = [41.3926, 2.0701];

const app: Express = express();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use(express.json());
app.listen(4001, () => console.log('MoLoCo running on port 4001'));

app.get('/getDevice', async(req, res) => {
    const deviceInfo = await getDeviceInfo();
    return res.json({
        status: 200,
        message: 'success',
        body: JSON.stringify(deviceInfo),
    });
});

app.post('/setLocation', async(req, res) => {
    const { deviceId, lat, lon } = req.body;
    if (deviceId && lat && lon) {
        await setDeviceLocation(deviceId, lat, lon);
    }
});

app.post('/resetLocation', async(req, res) => {
    const { deviceId } = req.body;
    console.log(` ---------------------- on resetLocation with deviceId: ${deviceId}`);
    if (deviceId) {
        await resetDeviceLocation(deviceId);
    }
});

async function getDeviceInfo() {
    const devices = await utilities.getConnectedDevices();
    console.log(` -------------------------------------> devices: ${JSON.stringify(devices, null, '    ')}`);
    if (devices && devices.length) {
        const uuid = devices[0];
        const info = await utilities.getDeviceInfo(uuid);
        await setDeviceLocation(uuid, BARCELONA[0], BARCELONA[1]);
        console.log(` -------------------------------------> info: ${JSON.stringify(info, null, '    ')}`);
        return info;
    }
}

async function setDeviceLocation(uuid: string, lat: number, lon: number) {
    const locationService = await services.startSimulateLocationService(uuid);
    console.log(` -------------------------------------> gonna try to set location of device ${uuid} to: ${lat} : ${lon} `);
    locationService.setLocation(lat, lon);
    console.log(` -------------------------------------> welcome to Barcelona `);
}

async function resetDeviceLocation(uuid: string) {
    const locationService = await services.startSimulateLocationService(uuid);
    locationService.resetLocation();
}