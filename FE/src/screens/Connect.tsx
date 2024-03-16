import React from 'react'
import { useState } from 'react'
import { Alert, Platform, Text, View } from 'react-native'
import Checkbox from '@react-native-community/checkbox'
import { PermissionsAndroid } from 'react-native'
import base64 from 'react-native-base64';
import { BleManager, Device, State } from 'react-native-ble-plx';
import { LogBox } from 'react-native';
import { useTheme, Button, ActivityIndicator, Icon, List } from 'react-native-paper';

//import Toast from 'react-native-toast-message'

export const BLTManager = new BleManager()

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

const MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';
const OBJECT_UUID = 'f27b53ad-c63d-49a0-8c0f-9f297e6cc520';

class ActiveNotes {
    public activeNotes: number[];
    constructor(numbers: number[]) {
        this.activeNotes = numbers;
    }
}

export default function Connect() {
    const { colors } = useTheme();

    //Is a device connected?
    const [isConnected, setIsConnected] = useState(false);
    const [connecting, setConnecting] = useState(false);

    //What device is connected?
    const [connectedDevice, setConnectedDevice] = useState<Device>();

    const subscription = BLTManager.onStateChange((state) => {  // check if device bluetooth is powered on, if not alert to enable it!
        if (state === 'PoweredOff') {
            Alert.alert('"App" would like to use Bluetooth.', 'This app uses Bluetooth to connect to and share information with your .....', [
                {
                    text: "Don't allow",
                    onPress: () => { console.log('Cancel Pressed'); },
                    style: 'cancel',
                },
                { text: "Turn ON", onPress: () => { BLTManager.enable() } },
            ]);

            subscription.remove();
        }
    }, true);

    const [message, setMessage] = useState('Nothing Yet');
    const [boxvalue, setBoxValue] = useState(false);

    const requestBluetoothPermission = async () => {
        if (Platform.OS === 'ios') {
            return true
        }
        if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
            const apiLevel = parseInt(Platform.Version.toString(), 10)

            if (apiLevel < 31) {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                return granted === PermissionsAndroid.RESULTS.GRANTED
            }
            if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
                const result = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                ])

                return (
                    result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
                    (await BLTManager.state()) == State.PoweredOn
                )
            }
        }
        /*
        Toast.show({
          type: 'info',
          text1: 'Permissions have not been granted'
        });
        */

        return false
    }

    // Scans availbale BLT Devices and then call connectDevice
    async function scanDevices() {
        const numArr = new ActiveNotes([1, 2, 3]);
        console.log(JSON.stringify(numArr));
        requestBluetoothPermission().then(answer => {//check answer
            if (answer == true) {
                console.log('scanning');
                setConnecting(true);
                // display the Activityindicator

                BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
                    if (error) {
                        console.warn(error);
                    }

                    if (scannedDevice) {
                        console.log(scannedDevice.name);
                        if (scannedDevice.name == 'ESP32') {
                            BLTManager.stopDeviceScan();
                            connectDevice(scannedDevice);
                        }
                    }
                });

                // stop scanning devices after 5 seconds
                setTimeout(() => {
                    BLTManager.stopDeviceScan();
                }, 5000);
            } else {
                Alert.alert('Permissions not granted, try again');
            }
        });
    }

    // handle the device disconnection (poorly)
    async function disconnectDevice() {
        console.log('Disconnecting start');
        BLTManager.stopDeviceScan();

        if (connectedDevice != null) {
            const isDeviceConnected = await connectedDevice.isConnected();
            if (isDeviceConnected) {
                BLTManager.cancelTransaction('messagetransaction');
                BLTManager.cancelTransaction('nightmodetransaction');
                BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
                    console.log('DC completed'),
                );
            }

            const connectionStatus = await connectedDevice.isConnected();
            if (!connectionStatus) {
                setIsConnected(false);
                setConnecting(false);
            }
        } else {
            setIsConnected(false);
            setConnecting(false);
        }
    }

    //Function to send object data to ESP32
    async function sendObjectValue(value: string) {
        BLTManager.writeCharacteristicWithResponseForDevice(
            connectedDevice?.id ?? "",
            SERVICE_UUID,
            OBJECT_UUID,
            base64.encode(value),
        ).then(characteristic => {
            console.log('Wrote object data:', base64.decode(characteristic.value ?? ""));
        });
    }

    //Function to send object data to ESP32
    async function sendMessageValue(value: string) {
        BLTManager.writeCharacteristicWithResponseForDevice(
            connectedDevice?.id ?? "",
            SERVICE_UUID,
            MESSAGE_UUID,
            base64.encode(value),
        ).then(characteristic => {
            console.log('Wrote message:', base64.decode(characteristic.value ?? ""));
        });
    }

    //Connect the device and start monitoring characteristics
    async function connectDevice(device: Device) {
        console.log('connecting to Device:', device.name);

        device
            .connect()
            .then(device => {
                setConnectedDevice(device);
                setIsConnected(true);
                return device.discoverAllServicesAndCharacteristics();
            })
            .then(device => {
                //  Set what to do when DC is detected
                BLTManager.onDeviceDisconnected(device.id, (error, device) => {
                    console.log('Device DC');
                    setIsConnected(false);
                });

                //Read inital values

                //Message
                device
                    .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
                    .then(valenc => {
                        setMessage(base64.decode(valenc?.value ?? ""));
                    });

                //BoxValue
                device
                    .readCharacteristicForService(SERVICE_UUID, OBJECT_UUID)
                    .then(valenc => {
                        setBoxValue(StringToBool(base64.decode(valenc?.value ?? "")));
                    });

                //monitor values and tell what to do when receiving an update

                //Message
                device.monitorCharacteristicForService(
                    SERVICE_UUID,
                    MESSAGE_UUID,
                    (error, characteristic) => {
                        if (characteristic?.value != null) {
                            setMessage(base64.decode(characteristic?.value));
                            console.log(
                                'Message update received: ',
                                base64.decode(characteristic?.value),
                            );
                        }
                    },
                    'messagetransaction',
                );

                /*
                //BoxValue
                device.monitorCharacteristicForService(
                    SERVICE_UUID,
                    BOX_UUID,
                    (error, characteristic) => {
                        if (characteristic?.value != null) {
                            setBoxValue(StringToBool(base64.decode(characteristic?.value)));
                            console.log(
                                'Box Value update received: ',
                                base64.decode(characteristic?.value),
                            );
                        }
                    },
                    'boxtransaction',
                );
                */

                console.log('Connection established');
                sendMessageValue("{command:\"hamilton\"}");
                sendMessageValue("{command:\"startAc\"}");

                const numArr = new ActiveNotes([4, 16, 17, 5, 18, 19, 21]);
                //sendMessageValue("{command:\"stopAc\"}");
                sendObjectValue(JSON.stringify(numArr));
            });
    }
    return (
        <View
            style={{
                flex: 1,
                paddingVertical: 26,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.background,
            }}>
            {!isConnected ? (
                connecting ? (<View style={{ gap: 5 }}>
                    <ActivityIndicator animating={true} />
                    <Button
                        mode="contained"
                        onPress={() => {
                            scanDevices();
                        }}
                        disabled={false}
                    >
                        Reset scan
                    </Button>
                    <Button
                        mode="contained"
                        onPress={() => {
                            setIsConnected(true);
                            BLTManager.stopDeviceScan();
                            console.log("faked connect");
                        }}
                        disabled={false}
                    >
                        Fake connect
                    </Button>
                </View>) : (<View>
                    <Button
                        mode="contained"
                        onPress={() => {
                            scanDevices();
                        }}
                        disabled={false}
                    >
                        Connect
                    </Button></View>)
            ) : (
                <View>
                    <Icon source="check-circle" size={200} color={colors.primary}></Icon>
                    <Button
                        mode="contained"
                        onPress={() => {
                            disconnectDevice();
                        }}
                        disabled={false}
                    >
                        Disconnect
                    </Button>
                </View>
            )
            }
            <Text>{message}</Text>
        </View >
    )
}

function StringToBool(input: String) {
    if (input == '1') {
        return true;
    } else {
        return false;
    }
}

function BoolToString(input: boolean) {
    if (input == true) {
        return '1';
    } else {
        return '0';
    }
}




