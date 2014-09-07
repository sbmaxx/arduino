#include <math.h>
#include <LineDriver.h>
#include <LiquidCrystalExt.h>
#include <LiquidCrystalRus.h>

#define TERMIST_B 4300 
#define VIN 5.0

#define RED 6
#define BLUE 3
#define BUZZER 8

#define ON HIGH
#define OFF LOW

#define HOT 25
#define COLD 20

//http://wiki.amperka.ru/схемы-подключения:подключение-текстового-экрана
LiquidCrystalRus lcd(4, 5, 10, 11, 12, 13);

int incomingByte = 0;   // for incoming serial data

void setup()
{
  pinMode(RED, OUTPUT);
  pinMode(BLUE, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  lcd.begin(20, 4);
  lcd.clear();
  Serial.begin(9600);
}

void loop()
{
  digitalWrite(RED, HIGH);
  digitalWrite(BLUE, LOW);

  float voltage = analogRead(A0) * VIN / 1024.0;
  float r1 = voltage / (VIN - voltage);
  float temperature = 1./( 1./(TERMIST_B)*log(r1)+1./(25. + 273.) ) - 273;

//  lcd.clear();
//  lcd.print("Температура: ");
//  lcd.print(temperature);

  // pin, freq, duration
//  tone(BUZZER, 3500, 2000);
//  delay(2000);
//  noTone(BUZZER);


  // send data only when you receive data:
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();
  
    // say what you got:
    Serial.print("I received: ");
    Serial.println(incomingByte, DEC);
    lcd.print(incomingByte);
  }

  if (temperature <= COLD)
  {
    digitalWrite(RED, OFF);
    digitalWrite(BLUE, ON);
  }
  else if (temperature >= COLD && temperature <= HOT)
  {
    analogWrite(RED, 125);
    analogWrite(BLUE, 125);
  }
  else
  {
    digitalWrite(RED, ON);
    digitalWrite(BLUE, OFF);
  }
 
  delay(10000);

}
