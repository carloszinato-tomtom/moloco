export type locationParams = {
    deviceId: string,  
    lat: number,  
    lon: number,  
};

export type deviceInfo = {
    BasebandCertId: number,
    BasebandKeyHashInformation: {
        AKeyStatus: number,
        SKeyHash: {
            type: string,
            data: Array<number>
        },
        SKeyStatus: number
    },
    BasebandSerialNumber: {
        type: string,
        data: Array<number>
    },
    BasebandVersion: string,
    BoardId: number,
    BuildVersion: string,
    CPUArchitecture: string,
    ChipID: number,
    DeviceClass: string,
    DeviceColor: string,
    DeviceName: string,
    DieID: number,
    HardwareModel: string,
    HasSiDP: boolean,
    PartitionType: string,
    ProductName: string,
    ProductType: string,
    ProductVersion: string,
    ProductionSOC: boolean,
    ProtocolVersion: string,
    SupportedDeviceFamilies: Array<number>,
    TelephonyCapability: boolean,
    UniqueChipID: number,
    UniqueDeviceID: string | undefined,
    WiFiAddress: string
};