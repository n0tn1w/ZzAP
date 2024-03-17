void setup() {
  Serial.begin(115200);
  pinMode(16, OUTPUT); // Set the diode pin as an output
//  pinMode(19, INPUT); // Set the diode pin as an output
//  pinMode(13, INPUT); // Set the diode pin as an output
//  pinMode(12, INPUT); // Set the diode pin as an output
//  pinMode(25, INPUT); // Set the diode pin as an output
//  pinMode(22, INPUT); // Set the diode pin as an output
//  pinMode(27, INPUT); // Set the diode pin as an output
//  pinMode(23, INPUT); // Set the diode pin as an output
//  pinMode(18, INPUT); // Set the diode pin as an output
//  pinMode(35, INPUT); // Set the diode pin as an output

  pinMode(19, OUTPUT); // Set the diode pin as an output
  pinMode(13, OUTPUT); // Set the diode pin as an output
  pinMode(12, OUTPUT); // Set the diode pin as an output
  pinMode(25, OUTPUT); // Set the diode pin as an output
  pinMode(22, OUTPUT); // Set the diode pin as an output
  pinMode(27, OUTPUT); // Set the diode pin as an output
  pinMode(23, OUTPUT); // Set the diode pin as an output
  pinMode(18, OUTPUT); // Set the diode pin as an output
  pinMode(35, OUTPUT); // Set the diode pin as an output
    digitalWrite(19, HIGH);
  digitalWrite(13, HIGH);
  digitalWrite(12, HIGH);
  digitalWrite(25, HIGH);
  digitalWrite(22, HIGH);
  digitalWrite(27, HIGH);
  digitalWrite(23, HIGH);
  digitalWrite(18, HIGH);
  digitalWrite(35, HIGH);
}



void loop() {
    digitalWrite(16, HIGH); // Set the diode pin as an output
//    for (int pin : {19, 13, 12, 25, 22, 27, 23, 18, 35}) {
//    digitalWrite(pin, HIGH);
//  }
  
//      int p1 = digitalRead(19); // Read the state of pin 22
//      int p2 = digitalRead(13);
//      int p3 = digitalRead(12);
//      int p4 = digitalRead(25);
//      int p5 = digitalRead(22);
//      int p6 = digitalRead(27);
//      int p7 = digitalRead(23);
//      int p8 = digitalRead(18);
//      int p9 = digitalRead(35);
//      if(p1 != 1) {
//           Serial.println(19);       
//      }
//      if(p2 != 1) {
//           Serial.println(13);       
//      }
//      if(p3 != 1) {
//           Serial.println(12);       
//      }
//      if(p4 != 1) {
//           Serial.println(25);       
//      }
//      if(p5 != 1) {
//           Serial.println(22);       
//      }
//      if(p6 != 1) {
//           Serial.println(27);       
//      }
//      if(p7 != 1) {
//           Serial.println(23);       
//      }
//      if(p8 != 1) {
//           Serial.println(18);       
//      }if(p9 != 1) {
//           Serial.println(35);       
//      }
}

////33, 32, 35
//void setup() {
//
////  pinMode(33, OUTPUT); // Set the diode pin as an output
////  pinMode(32, OUTPUT); // Set the diode pin as an output
////  pinMode(35, OUTPUT); // Set the diode pin as an output
////  pinMode(34, OUTPUT); // Set the diode pin as an output
////  pinMode(25, OUTPUT); // Set the diode pin as an output
////  pinMode(26, OUTPUT); // Set the diode pin as an output
////  pinMode(27, OUTPUT); // Set the diode pin as an output
////  pinMode(14, OUTPUT); // Set the diode pin as an output
////  pinMode(13, OUTPUT); // Set the diode pin as an output
////  pinMode(12, OUTPUT); // Set the diode pin as an output
////  // other side
////  pinMode(2, OUTPUT); // Set the diode pin as an output
////  pinMode(3, OUTPUT); // Set the diode pin as an output
////  pinMode(15, OUTPUT); // Set the diode pin as an output
//  pinMode(4, INPUT); // Set the diode pin as an output
////  pinMode(16, OUTPUT); // Set the diode pin as an output
////  pinMode(17, INPUT); // Set the diode pin as an output
////  pinMode(5, OUTPUT); // Set the diode pin as an output
////  pinMode(18, OUTPUT); // Set the diode pin as an output
////  pinMode(19, OUTPUT); // Set the diode pin as an output
////  pinMode(21, INPUT); // Set the diode pin as an output
////  pinMode(22, OUTPUT); // Set the diode pin as an output
////  pinMode(23, OUTPUT); // Set the diode pin as an output
//  
//  //pinMode(CMD, OUTPUT); // Set the diode pin as an output
//   // pinMode(D2, INPUT);
//
//
//}
//
//void loop() {
//Serial.println("fajwf");
//        int state = digitalRead(4);
//    Serial.println("fajwf" + state);
////  digitalWrite(34, HIGH); // Turn on the diode
////  digitalWrite(25, HIGH); // Turn on the diode
////  digitalWrite(26, HIGH); // Turn on the diode
////  digitalWrite(27, HIGH); // Turn on the diode
////  digitalWrite(14, HIGH); // Turn on the diode
////  digitalWrite(13, HIGH); // Turn on the diode
////  digitalWrite(12, HIGH); // Turn on the diode
////  
////  digitalWrite(2, HIGH); // Turn on the diode
////  digitalWrite(3, HIGH);
////  digitalWrite(15, HIGH);
////  digitalWrite(4, HIGH);
////  digitalWrite(5, HIGH);
////  digitalWrite(16, HIGH);
//  //digitalWrite(17, HIGH);
////  digitalWrite(18, HIGH);
////  digitalWrite(19, HIGH);
//  //digitalWrite(21, HIGH);
////  digitalWrite(22, HIGH);
////  digitalWrite(23, HIGH);
//  delay(1000); // Wait for 1 second
//
////  digitalWrite(34, LOW); // Turn on the diode
////  digitalWrite(25, LOW); // Turn on the diode
////  digitalWrite(26, LOW); // Turn on the diode
////  digitalWrite(27, LOW); // Turn on the diode
////  digitalWrite(14, LOW); // Turn on the diode
////  digitalWrite(13, LOW); // Turn on the diode
////  digitalWrite(12, LOW); // Turn on the diode
////  digitalWrite(2, LOW); // Turn on the diode
////  digitalWrite(3, LOW);
////    digitalWrite(21, LOW);
//
//  delay(1000); // Wait for 1 second
//}
//
//void setup() {
//  Serial.begin(115200);
//  pinMode(4, INPUT); // Set the diode pin as an output
//} 
//
//void loop() {
//  //Serial.println("fajwf");
//  int state = digitalRead(4);
//  Serial.println((int)state);
//}

//void setup() {
//  Serial.begin(115200);
//  pinMode(16, OUTPUT);
//  digitalWrite(16, HIGH);
//  pinMode(25, INPUT);
//  //pinMode(25, OUTPUT);
//  //pinMode(33, OUTPUT);
//  //pinMode(23, OUTPUT);
//  pinMode(19, INPUT);
//  pinMode(13, INPUT);
//  //pinMode(21, OUTPUT);
//  //pinMode(27, OUTPUT);
//  pinMode(12, INPUT);
//  //pinMode(18, OUTPUT);
//  //pinMode(13, OUTPUT);
//}
//
//void loop() {
//    int pinState = digitalRead(25); // Read the state of pin 22
//      int pinState1 = digitalRead(19);
//      int pinState2 = digitalRead(13);
//      int pinState3 = digitalRead(12);
//      int pinState4 = digitalRead(25);
//      if(pinState1 == 1) {
//           Serial.println(19);       
//       }
//       if(pinState2 == 1) {
//           Serial.println(13);       
//       }
//       if(pinState3 == 1) {
//           Serial.println(12);       
//       }
//       if(pinState4 == 1) {
//           Serial.println(25);       
//       }
//  // Print the state of pin 22 to the serial monitor
//}
