#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

#define FIREBASE_HOST "it-fcm.firebaseio.com"
#define FIREBASE_AUTH "SMaxXzINDntofyO5VHF3NqAZDSUoS3Vp19VGMSQH"

#define WIFI_SSID "Batman"
#define WIFI_PASSWORD "kulkarni"

String status = "off";
void setup() {
  Serial.begin(9600);
  pinMode(D2,OUTPUT);
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

int n = 0;

void loop() {

  status = Firebase.getString("/automation/light/value");
  Serial.println(status);
  if (Firebase.failed()) {
      Serial.print("setting /message failed:");
      Serial.println(Firebase.error());  
      return;
  }
  
  if(status.equals("on")){
        digitalWrite(D2,HIGH);
  }
  else {
        digitalWrite(D2,LOW);
  }
  
}
