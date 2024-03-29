#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <ArduinoJson.h>

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


namespace Pins {
  const int R_15 = 15; // Not stable
  const int START_2 = 16;
  const int R_19 = 19;
  const int R_25 = 25;
  const int R_13 = 13;
  const int R_12 = 12;
  
  const int R_0 = 0; // Not stable
  const int R_4 = 4;
  //const int R_16 = 16;
  const int R_17 = 17;
  const int R_5 = 5;
  const int R_18 = 18;
  
  const int R_21 = 21;
  const int R_22 = 22;
  const int R_23 = 23;
};

void InitRightSidePins() {
  Serial.println("Init!");
  //pinMode(Pins::R_15, INPUT); // Set the diode pin as an output
  pinMode(Pins::START_2, OUTPUT); // Set the diode pin as an output
  pinMode(Pins::R_19, INPUT); // Set the diode pin as an output
  pinMode(Pins::R_25, INPUT);
  pinMode(Pins::R_13, INPUT);
  pinMode(Pins::R_12, INPUT);

  
//  pinMode(Pins::R_0, INPUT); // Set the diode pin as an output
//  pinMode(Pins::R_4, INPUT); // Set the diode pin as an output
  //pinMode(Pins::R_16, INPUT); // Set the diode pin as an output
//  pinMode(Pins::R_17, INPUT); // Set the diode pin as an output
//  pinMode(Pins::R_5, INPUT); // Set the diode pin as an output
//  pinMode(Pins::R_18, INPUT); // Set the diode pin as an output
//  pinMode(Pins::R_21, INPUT); // Set the diode pin as an output
  //pinMode(Pins::R_22, INPUT); // Set the diode pin as an output
  //pinMode(Pins::R_23, INPUT); // Set the diode pin as an output
}

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

void Disconnect() {
      BLEAdvertising* pAdvertising = pServer->getAdvertising();
    pAdvertising->stop(); // Stop advertising
}

namespace HamiltonGame {
  struct ActiveGraph {
    std::vector<int> activeNodes;
    std::vector<std::pair<int, int>> edges;
  };
  
  ActiveGraph activeGraph;
  
  void InitHamilton(std::string inputString) {
    Serial.print("in:");
    Serial.println(inputString.c_str());
    DynamicJsonDocument doc(1024); // Adjust capacity as needed
    DeserializationError error = deserializeJson(doc, inputString);
    if (error) {
        Serial.print("InitHamilton deserializeJson() failed: ");
        Serial.println(error.c_str());
        return;
    }
    JsonArray dataNodeResultArray = doc["activeNodes"];
    Serial.println(dataNodeResultArray);
    for (JsonVariant value : dataNodeResultArray) {
        int node1 = value.as<int>();
        activeGraph.activeNodes.push_back(node1);
    }
//    JsonArray dataEdgesArray = doc["edges"];
//    Serial.println(dataEdgesArray);
//    for (JsonVariant value : dataEdgesArray) {
//        int node1 = value[0].as<int>();
//        int node2 = value[1].as<int>();
//
//        activeGraph.edges.push_back({node1, node2});
//    }
  }

  void CallStartFE() {
    Serial.println("CallStartFE");
    message_characteristic->setValue("{command: \"hamilton\"}");
    message_characteristic->notify();  
    digitalWrite(Pins::START_2, HIGH);
  }

  
  void PostGameLighting() {
    
    digitalWrite(Pins::START_2, HIGH);
    delay(3000);
    digitalWrite(Pins::START_2, LOW);
    digitalWrite(Pins::START_2, HIGH);
    delay(3000);
    digitalWrite(Pins::START_2, LOW);
    digitalWrite(Pins::START_2, HIGH);
    delay(3000);
    digitalWrite(Pins::START_2, LOW);
  }

  void CallEndGame() {
    Serial.println("CallEndGame");
    message_characteristic->setValue("end");
    message_characteristic->notify();
    PostGameLighting();  
    Disconnect();

  }
  
  void PlayHamilton() {
     Serial.println("PlayHamilton");
     bool allDone = false;
     bool z = true;
     if(activeGraph.activeNodes.size() == 0) {
        return; 
     }
     Serial.print("ask: ");
     Serial.print(activeGraph.activeNodes.size());
     for(int el : activeGraph.activeNodes) {
        if(z) {
          allDone= true;
          z=false;
        }
        int state = digitalRead(el);       
        if(state != 1) {
            allDone = false;
//              Serial.print(el);
//              Serial.print(" EXIT: ");
//              Serial.print(state);
//              Serial.println(" ");
            return;
        }
     }
     
     if( allDone ) {
      Serial.print("Game over you win!");

      Global::command = Const::idle;
      CallEndGame();
     }
  }
}

class MyServerCallbacks : public BLEServerCallbacks
{
  void onConnect(BLEServer *pServer)
  {
    Serial.println("Connected");
  };

  void onDisconnect(BLEServer *pServer)
  {
    Global::command = Const::idle;
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
      HamiltonGame::CallStartFE();
      Global::command = Const::hamilton;

      Serial.print("You are playing hamilton!");
    } else if(valueWritten == Const::game2) {
      Global::command = Const::game2;
    } else {
      Serial.println(Global::command.c_str());
      if(Global::command == Const::hamilton) {

        //Serial.print("Init hamilton!");
        HamiltonGame::InitHamilton(valueWritten);
        Serial.print("Send acknowledge to FE");
        
      } else if(Global::command == Const::game2) {
        
      } else if(valueWritten == "disconnect") {
        Serial.print("Disconnect!!!!!!!!");
        Disconnect();
      }
    }
  }
};

void setup()
{
  Serial.begin(115200);
    pinMode(Pins::START_2, OUTPUT);
  //digitalWrite(16, HIGH);
  
  //Init Pins
  InitRightSidePins();

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

//  box_characteristic->setValue("0");
  box_characteristic->setCallbacks(new CharacteristicsCallbacks());

  Serial.println("Waiting for a client connection to notify...");

  Global::command = Const::idle; //!!!!!!
}

void loop()
{

  if(Global::command == Const::idle) {
    delay(1000);  
  } else if(Global::command == Const::hamilton) {
    HamiltonGame::PlayHamilton();
  }

    
}
