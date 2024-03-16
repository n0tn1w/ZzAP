const int diodePin = 35; // Choose the GPIO pin connected to the diode
//33, 32, 35
void setup() {

  pinMode(33, OUTPUT); // Set the diode pin as an output
  pinMode(32, OUTPUT); // Set the diode pin as an output
  pinMode(35, OUTPUT); // Set the diode pin as an output
  pinMode(34, OUTPUT); // Set the diode pin as an output
  pinMode(25, OUTPUT); // Set the diode pin as an output
  pinMode(26, OUTPUT); // Set the diode pin as an output
  pinMode(27, OUTPUT); // Set the diode pin as an output
  pinMode(14, OUTPUT); // Set the diode pin as an output
  pinMode(13, OUTPUT); // Set the diode pin as an output
  pinMode(12, OUTPUT); // Set the diode pin as an output
  // other side
  pinMode(2, OUTPUT); // Set the diode pin as an output
  pinMode(3, OUTPUT); // Set the diode pin as an output
  pinMode(15, OUTPUT); // Set the diode pin as an output
  pinMode(4, OUTPUT); // Set the diode pin as an output
  pinMode(16, OUTPUT); // Set the diode pin as an output
  pinMode(17, OUTPUT); // Set the diode pin as an output
  pinMode(5, OUTPUT); // Set the diode pin as an output
  pinMode(18, OUTPUT); // Set the diode pin as an output
  pinMode(19, OUTPUT); // Set the diode pin as an output
  pinMode(21, OUTPUT); // Set the diode pin as an output
  pinMode(22, OUTPUT); // Set the diode pin as an output
  pinMode(23, OUTPUT); // Set the diode pin as an output
  
  //pinMode(CMD, OUTPUT); // Set the diode pin as an output
   // pinMode(D2, INPUT);


}

void loop() {
  digitalWrite(34, HIGH); // Turn on the diode
  digitalWrite(25, HIGH); // Turn on the diode
  digitalWrite(26, HIGH); // Turn on the diode
  digitalWrite(27, HIGH); // Turn on the diode
  digitalWrite(14, HIGH); // Turn on the diode
  digitalWrite(13, HIGH); // Turn on the diode
  digitalWrite(12, HIGH); // Turn on the diode
  
  digitalWrite(2, HIGH); // Turn on the diode
  digitalWrite(3, HIGH);
  digitalWrite(15, HIGH);
  digitalWrite(4, HIGH);
  digitalWrite(5, HIGH);
  digitalWrite(16, HIGH);
  digitalWrite(17, HIGH);
  digitalWrite(18, HIGH);
  digitalWrite(19, HIGH);
  digitalWrite(21, HIGH);
  digitalWrite(22, HIGH);
  digitalWrite(23, HIGH);
  delay(1000); // Wait for 1 second
  digitalWrite(34, LOW); // Turn on the diode
  digitalWrite(25, LOW); // Turn on the diode
  digitalWrite(26, LOW); // Turn on the diode
  digitalWrite(27, LOW); // Turn on the diode
  digitalWrite(14, LOW); // Turn on the diode
  digitalWrite(13, LOW); // Turn on the diode
  digitalWrite(12, LOW); // Turn on the diode
  digitalWrite(2, LOW); // Turn on the diode
  digitalWrite(3, LOW);
  delay(1000); // Wait for 1 second
}
