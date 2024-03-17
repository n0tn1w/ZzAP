import { StackScreenProps } from "@react-navigation/stack";
import React, { Component, useEffect, useRef } from "react";
import { useState } from "react";
import { Alert, Platform, View } from "react-native";
import { PermissionsAndroid } from "react-native";
import base64 from "react-native-base64";
import { BleManager, Device, State } from "react-native-ble-plx";
import {
  useTheme,
  Button,
  ActivityIndicator,
  Icon,
  Text,
} from "react-native-paper";
import StopwatchTimer, {
  StopwatchTimerMethods,
} from "react-native-animated-stopwatch-timer";
import useAxios from "../../utils/useAxios";

export const BLTManager = new BleManager();

const SERVICE_UUID: string = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";

const MESSAGE_UUID: string = "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd";
const OBJECT_UUID: string = "f27b53ad-c63d-49a0-8c0f-9f297e6cc520";

export type LevelData = {
  activeNodes: number[];
  edges: [number, number][];
};

export type Level = {
  title: string;
  description: string;
  icon: string;
  data: LevelData;
};

export default function Connect({ navigation }: StackScreenProps<any>) {
  const { colors } = useTheme();

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [connectedDevice, setConnectedDevice] = useState<Device>();
  const [message, setMessage] = useState<String>("Nothing Yet");

  const [timeBegin, setTimeBegin] = useState<Number>(Date.now());
  const [finalTime, setFinalTime] = useState<Number>(Date.now());

  const stopwatchTimerRef = useRef<StopwatchTimerMethods>(null);

  // Methods to control the stopwatch
  function play() {
    stopwatchTimerRef.current?.play();
  }

  function pause() {
    stopwatchTimerRef.current?.pause();
  }

  function reset() {
    stopwatchTimerRef.current?.reset();
  }

  const level1: Level = {
    title: "Level 1",
    description:
      "The objective of the level is to find the safest path, where the numbers are the danger levels of the roads.",
    icon: "graphql",
    data: {
      activeNodes: [4, 19, 13, 12, 25],
      edges: [
        [4, 16],
        [16, 17],
      ],
    },
  };

  console.log(JSON.stringify(level1.data));

  const subscription = BLTManager.onStateChange((state) => {
    // check if device bluetooth is powered on, if not alert to enable it!
    if (state === "PoweredOff") {
      Alert.alert(
        '"App" would like to use Bluetooth.',
        "This app uses Bluetooth to connect to and share information with your .....",
        [
          {
            text: "Don't allow",
            onPress: () => {
              console.log("Cancel Pressed");
            },
            style: "cancel",
          },
          {
            text: "Turn ON",
            onPress: () => {
              BLTManager.enable();
            },
          },
        ]
      );

      subscription.remove();
    }
  }, true);

  const requestBluetoothPermission = async () => {
    if (Platform.OS === "ios") {
      return true;
    }
    if (
      Platform.OS === "android" &&
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ) {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      if (
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN &&
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      ) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        return (
          result["android.permission.BLUETOOTH_CONNECT"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.BLUETOOTH_SCAN"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.ACCESS_FINE_LOCATION"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          (await BLTManager.state()) == State.PoweredOn
        );
      }
    }
    return false;
  };

  async function scanDevices() {
    requestBluetoothPermission().then((answer) => {
      if (answer == true) {
        console.log("scanning");
        setConnecting(true);
        BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
          if (error) {
            console.warn(error);
          }
          if (scannedDevice != null) {
            console.log(scannedDevice.name);
            if (scannedDevice.name == "ESP32") {
              BLTManager.stopDeviceScan();
              connectDevice(scannedDevice);
            }
          }
        });
        setTimeout(() => {
          BLTManager.stopDeviceScan();
        }, 5000);
      } else {
        Alert.alert("Permissions not granted, try again");
      }
    });
  }

  async function disconnectDevice() {
    console.log("Disconnecting start");
    BLTManager.stopDeviceScan();

    if (connectedDevice != null) {
      while ((await connectedDevice.isConnected()) == true) {
        const isDeviceConnected = await connectedDevice.isConnected();
        if (isDeviceConnected) {
          BLTManager.cancelTransaction("messagetransaction");
          BLTManager.cancelTransaction("nightmodetransaction");
          BLTManager.cancelDeviceConnection(connectedDevice.id);
        }
      }
      console.log("DC completed");
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
      base64.encode(value)
    ).then((characteristic) => {
      console.log(
        "Wrote object data:",
        base64.decode(characteristic.value ?? "")
      );
    });
  }

  //Function to send object data to ESP32
  async function sendMessageValue(value: string) {
    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice?.id ?? "",
      SERVICE_UUID,
      MESSAGE_UUID,
      base64.encode(value)
    ).then((characteristic) => {
      console.log("Wrote message:", base64.decode(characteristic.value ?? ""));
    });
  }

  function getTime(date: Date) {
    return (
      date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds()
    );
  }

  //Connect the device and start monitoring characteristics
  async function connectDevice(device: Device) {
    console.log("connecting to Device:", device.name);
    device
      .connect()
      .then((device) => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log("Device DC");
          setIsConnected(false);
          setConnecting(false);
        });

        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then((valenc) => {
            setMessage(base64.decode(valenc?.value ?? ""));
          });

        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value));
              console.log(
                "Message update received: ",
                base64.decode(characteristic?.value)
              );
              if (message == '{"command":"end"}') {
                setIsFinished(true);
                setCompleted(true);
                setFinalTime(Date.now());
              }
            }
          },
          "messagetransaction"
        );

        console.log("Connection established");
        setTimeout(() => {
          sendMessageValue("hamilton");
        }, 350);
        setTimeout(() => {
          sendObjectValue(JSON.stringify(level1.data));
        }, 350);
        //sendMessageValue("{command:\"hamilton\"}");
        //sendMessageValue("{\"inz\":5}");

        //sendMessageValue("{command:\"startAc\"}");
        //sendMessageValue("{command:\"stopAc\"}");
      });
  }

  const ConnectComponent: React.FC = () => {
    return (
      <View>
        <Button
          mode="contained"
          onPress={() => {
            scanDevices();
          }}
          disabled={false}
        >
          Connect
        </Button>
      </View>
    );
  };

  const ConnectingComponent: React.FC = () => {
    return (
      <View style={{ gap: 5 }}>
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
        {/* <Button
          mode="contained"
          onPress={() => {
            setIsConnected(true);
            setConnecting(false);
            BLTManager.stopDeviceScan();
            console.log("faked connect");
          }}
          disabled={false}
        >
          Fake connect
        </Button> */}
      </View>
    );
  };

  const ConnectedComponent: React.FC = () => {
    return (
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
            setTimeBegin(Date.now());
          }}
          disabled={false}
        >
          Start Level
        </Button>
      </View>
    );
  };

  const PlayingComponent: React.FC = () => {
    const [time, _] = useState(finalTime.valueOf() - timeBegin.valueOf());
    const [passed, setPassed] = useState(true);
    const axios = useAxios(true);

    const lId = level1.title == "Level 1" ? 0 : 1;

    const handleTimerEnd = async () => {
      try {
        const res = await axios.post(`levels/${lId}`, {
          time: time,
          passed: passed,
        });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <View
        style={{
          flex: 1,
          gap: 20,
          paddingVertical: 26,
          paddingHorizontal: 26,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text variant="titleLarge">{level1.title}</Text>
        <Text variant="bodyLarge">{level1.description}</Text>
        <Icon source={level1.icon} size={200} color={colors.primary}></Icon>
        {!isFinished ? (
          <View style={{ gap: 20 }}>
            <Button
              mode="contained"
              onPress={() => {
                setIsFinished(true);
                setPassed(false);
                handleTimerEnd();
              }}
            >
              Cancel
            </Button>
          </View>
        ) : (
          <View style={{ gap: 20 }}>
            <Text variant="titleLarge">
              {completed
                ? "Level Completed in " +
                  getTime(new Date(finalTime.valueOf() - timeBegin.valueOf()))
                : "Level not completed"}
            </Text>
            <Button
              mode="contained"
              onPress={() => {
                setPlaying(false);
                setIsFinished(false);
                disconnectDevice();
                navigation.navigate("levels");
              }}
              disabled={false}
            >
              Go back to Levels
            </Button>
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 26,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      {!playing ? (
        !isConnected ? (
          connecting ? (
            <ConnectingComponent />
          ) : (
            <ConnectComponent />
          )
        ) : (
          <ConnectedComponent />
        )
      ) : (
        <PlayingComponent />
      )}
      {/* <Text style={{ color: colors.onBackground }}>{message}</Text> */}
    </View>
  );
}

function StringToBool(input: String) {
  if (input == "1") {
    return true;
  } else {
    return false;
  }
}

function BoolToString(input: boolean) {
  if (input == true) {
    return "1";
  } else {
    return "0";
  }
}
