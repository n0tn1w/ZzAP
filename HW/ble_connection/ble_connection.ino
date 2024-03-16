#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <ArduinoJson.h>


namespace Const {
  const std::string hamilton = "hamilton";
  const std::string game2 = "game2";
  const std::string idle = "idle";
};
struct Graph {
    int edgesCount;
    std::vector<std::pair<int, int>> edges;
    int nodesCount;
    std::vector<int> nodesResult;
};

// Global flags
namespace Global {
   std::string command; 
   Graph graph;
}


// BLE SECTION
BLEServer *pServer = NULL;

BLECharacteristic *message_characteristic = NULL;
BLECharacteristic *box_characteristic = NULL;

String boxValue = "0";
// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"

#define MESSAGE_CHARACTERISTIC_UUID "6d68efe5-04b6-4a85-abc4-c2670b7bf7fd"
#define BOX_CHARACTERISTIC_UUID "f27b53ad-c63d-49a0-8c0f-9f297e6cc520"

class MyServerCallbacks : public BLEServerCallbacks
{
  void onConnect(BLEServer *pServer)
  {
    Serial.println("Connected");
  };

  void onDisconnect(BLEServer *pServer)
  {
    Serial.println("Disconnected");
  }
};

class CharacteristicsCallbacks : public BLECharacteristicCallbacks
{
  void onWrite(BLECharacteristic *pCharacteristic)
  {
    Serial.print("Value Written ");
    Serial.println(pCharacteristic->getValue().c_str());
    std::string valueWritten = pCharacteristic->getValue().c_str();

    if(valueWritten == Const::hamilton) {
      Global::command = Const::hamilton;
      Serial.print("You are playing hamilton!");
    } else if(valueWritten == Const::game2) {
      Global::command = Const::game2;
    } else {
      if(Global::command == Const::hamilton) {
        Serial.print("Init hamilton!");
        InitHamilton(valueWritten);
        Serial.print("Send acknowledge to FE");
        
      } else if(Global::command == Const::game2) {
        
      }
    }
  }

  void InitHamilton(std::string inputString) {
    DynamicJsonDocument doc(1024); // Adjust capacity as needed
    DeserializationError error = deserializeJson(doc, inputString);
    if (error) {
        Serial.print("InitHamilton deserializeJson() failed: ");
        Serial.println(error.c_str());
        return;
    }

    Global::graph;
    Global::graph.edgesCount = doc["edgesCount"];
    JsonArray dataEdgesArray = doc["edges"];
    for (JsonVariant value : dataEdgesArray) {
        int node1 = value[0];
        int node2 = value[1];
        Global::graph.edges.push_back({node1, node2});
    }
    Global::graph.nodesCount = doc["nodesCount"];
    JsonArray dataNodeResultArray = doc["nodeResult"];
    for (JsonVariant value : dataNodeResultArray) {
        int node1 = value[0];
        Global::graph.nodesResult.push_back(node1);
    }

  }
};

void setup()
{
  Serial.begin(115200);

    // Initialize BLE
  BLEDevice::init("ESP32");

  // Get the Bluetooth MAC address
  uint8_t address[6];
  BLEAddress bleAddress = BLEDevice::getAddress();
  Serial.println(bleAddress.toString().c_str());

  // Create the BLE Device
  // Create the BLE Server
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  // Create the BLE Service
  BLEService *pService = pServer->createService(SERVICE_UUID);
  delay(100);

  // Create a BLE Characteristic
  message_characteristic = pService->createCharacteristic(
      MESSAGE_CHARACTERISTIC_UUID,
      BLECharacteristic::PROPERTY_READ |
          BLECharacteristic::PROPERTY_WRITE |
          BLECharacteristic::PROPERTY_NOTIFY |
          BLECharacteristic::PROPERTY_INDICATE);

  box_characteristic = pService->createCharacteristic(
      BOX_CHARACTERISTIC_UUID,
      BLECharacteristic::PROPERTY_READ |
          BLECharacteristic::PROPERTY_WRITE |
          BLECharacteristic::PROPERTY_NOTIFY |
          BLECharacteristic::PROPERTY_INDICATE);

  // Start the BLE service
  pService->start();

  // Start advertising
  pServer->getAdvertising()->start();

  message_characteristic->setValue("Message one");
  message_characteristic->setCallbacks(new CharacteristicsCallbacks());

  box_characteristic->setValue("0");
  box_characteristic->setCallbacks(new CharacteristicsCallbacks());

  Serial.println("Waiting for a client connection to notify...");
}

void loop()
{
  message_characteristic->setValue("Message one");
  message_characteristic->notify();

  delay(1000);

  message_characteristic->setValue("Message Two");
  message_characteristic->notify();

  delay(1000);
}
