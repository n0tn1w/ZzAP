import { StackScreenProps } from '@react-navigation/stack';
import React, { Component } from 'react'
import { useState } from 'react'
import { Alert, Platform, View } from 'react-native'
import { PermissionsAndroid } from 'react-native'
import base64 from 'react-native-base64';
import { BleManager, Device, State } from 'react-native-ble-plx';
import { useTheme, Button, ActivityIndicator, Icon, Text } from 'react-native-paper';

//import Toast from 'react-native-toast-message'

export const BLTManager = new BleManager()

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

const MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';
const OBJECT_UUID = 'f27b53ad-c63d-49a0-8c0f-9f297e6cc520';

export type LevelData = {
    activeNodes: number[];
    edges: [number, number][];
}

export type Level = {
    title: string;
    description: string;
    icon: string;
    data: LevelData;
}

export default function Connect({ navigation }: StackScreenProps<any>) {
    const { colors } = useTheme();

    const [isConnected, setIsConnected] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [connecting, setConnecting] = useState(false);

    const [connectedDevice, setConnectedDevice] = useState<Device>();
    const [message, setMessage] = useState('Nothing Yet');

    const level1: Level = { title: "Level 1", description: "This level is nice level, very nice, very math. Gg go next. Easy win for jidjkadjiq. dominos. i must scream and i have no mouth", icon: "graphql", data: { activeNodes: [4, 16, 17], edges: [[4, 16], [16, 17]] } };

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
        return false
    }

    async function scanDevices() {
        requestBluetoothPermission().then(answer => {
            if (answer == true) {
                console.log('scanning');
                setConnecting(true);
                BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
                    if (error) {
                        console.warn(error);
                    }
                    if (scannedDevice != null) {
                        console.log(scannedDevice.name);
                        if (scannedDevice.name == 'ESP32') {
                            BLTManager.stopDeviceScan();
                            connectDevice(scannedDevice);
                        }
                    }
                });
                setTimeout(() => {
                    BLTManager.stopDeviceScan();
                }, 5000);
            } else {
                Alert.alert('Permissions not granted, try again');
            }
        });
    }

    async function disconnectDevice() {
        console.log('Disconnecting start');
        BLTManager.stopDeviceScan();

        if (connectedDevice != null) {
            while ((await connectedDevice.isConnected()) == true) {
                const isDeviceConnected = await connectedDevice.isConnected();
                if (isDeviceConnected) {
                    BLTManager.cancelTransaction('messagetransaction');
                    BLTManager.cancelTransaction('nightmodetransaction');
                    BLTManager.cancelDeviceConnection(connectedDevice.id);
                }
            }
            console.log('DC completed');
        }
        setIsConnected(false);
        setConnecting(false);
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
                BLTManager.onDeviceDisconnected(device.id, (error, device) => {
                    console.log('Device DC');
                    setIsConnected(false);
                    setConnecting(false);
                });

                device
                    .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
                    .then(valenc => {
                        setMessage(base64.decode(valenc?.value ?? ""));
                    });

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

                console.log('Connection established');
                //sendMessageValue("{command:\"hamilton\"}");
                sendMessageValue("hamilton");
                //sendMessageValue("{\"inz\":5}");

                //sendMessageValue("{command:\"startAc\"}");
                //sendMessageValue("{command:\"stopAc\"}");
                sendObjectValue(JSON.stringify(level1.data));
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

            {!playing ? (!isConnected ? (
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
                <View style={{ gap: 150 }}>
                    <Icon source="check-circle" size={200} color={colors.primary}></Icon>
                    <Button
                        mode="outlined"
                        onPress={() => {
                            disconnectDevice();
                        }}
                        disabled={false}
                    >
                        Disconnect
                    </Button>
                    <Button
                        mode="contained"
                        onPress={() => {
                            setPlaying(true);
                        }}
                        disabled={false}
                    >
                        Start Level
                    </Button>
                </View>
            )) : (
                <View style={{
                    flex: 1,
                    gap: 20,
                    paddingVertical: 26,
                    paddingHorizontal: 26,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.background,
                }}>
                    <Text variant="titleLarge">{level1.title}</Text>
                    <Text variant="bodyLarge">{level1.description}</Text>
                    <Icon source={level1.icon} size={200} color={colors.primary}></Icon>
                </View>
            )
            }
            <Text style={{ color: colors.onBackground }}>{message}</Text>
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




