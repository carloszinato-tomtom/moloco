import { deviceInfo, locationParams } from './types';

const URL = 'http://localhost:4001';

export const getDevice = async() => {
    const response = await fetch(`${URL}/getDevice`);
    const data = await response.json();
    return data.body;
};

export const setLocation = async({ deviceId, lat, lon }: locationParams): Promise<deviceInfo> =>  {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, lat, lon }),
    };
    const response = await fetch(`${URL}/setLocation`, options);
    const data = await response.json();
    return data;
};

export const resetLocation = async (deviceId: string | undefined) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId }),
    };
    const response = await fetch(`${URL}/resetLocation`, options);
    const data = await response.json();
    return data;
};