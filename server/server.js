const express =  require('express');
const Usbmux = require('appium-ios-device');
const utilities = Usbmux.utilities;
const services = Usbmux.services;

const app = express();
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
    console.log(` -------------------------------------> lat: ${lat}`);
    // await setDeviceLocation();
});

async function getDeviceInfo() {
    const devices = await utilities.getConnectedDevices();
    console.log(` -------------------------------------> devices: ${JSON.stringify(devices, null, '    ')}`);
    if (devices && devices.length) {
        const uuid = devices[0];
        const info = await utilities.getDeviceInfo(uuid);
        return info;
    }
}

async function setDeviceLocation(uuid, lat, lon) {
    const locationService = await services.startSimulateLocationService(uuid);
    console.log(` -------------------------------------> gonna try to set location `);
    locationService.setLocation(lat, lon);
    console.log(` -------------------------------------> welcome to Barcelona `);
    // locationService.resetLocation();
}

// getDeviceInfo();


