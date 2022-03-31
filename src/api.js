const URL = 'http://localhost:4001';

export const getDevice = async() => {
    const response = await fetch(`${URL}/getDevice`);
    const data = await response.json();
    return data.body;
};

export const setLocation = async({ deviceId, lat, lon }) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, lat, lon }),
    };
    const response = await fetch(`${URL}/setLocation`, options);
    const data = await response.json();
    return data;
};