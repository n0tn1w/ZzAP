const int diodePin = 33; // Choose the GPIO pin connected to the diode

void setup() {
  pinMode(diodePin, OUTPUT); // Set the diode pin as an output
}

void loop() {
  digitalWrite(diodePin, HIGH); // Turn on the diode
  delay(1000); // Wait for 1 second
  digitalWrite(diodePin, LOW); // Turn off the diode
  delay(1000); // Wait for 1 second
}
