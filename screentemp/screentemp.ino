#include <math.h>
#include <LineDriver.h>
#include <LiquidCrystalExt.h>
#include <LiquidCrystalRus.h>

#define TERMIST_B 4300 
#define VIN 5.0

#define RED 6
#define BLUE 3

#define ON HIGH
#define OFF LOW

#define HOT 25
#define COLD 20

//http://wiki.amperka.ru/схемы-подключения:подключение-текстового-экрана
LiquidCrystalRus lcd(4, 5, 10, 11, 12, 13);

void setup()
{
  pinMode(RED, OUTPUT);
  pinMode(BLUE, OUTPUT);
  lcd.begin(20, 4);
  lcd.clear();
}

void loop()
{
  digitalWrite(RED, HIGH);
  digitalWrite(BLUE, LOW);

  float voltage = analogRead(A0) * VIN / 1024.0;
  float r1 = voltage / (VIN - voltage);
  float temperature = 1./( 1./(TERMIST_B)*log(r1)+1./(25. + 273.) ) - 273;

  lcd.clear();
  lcd.print("Температура: ");
  lcd.print(temperature);

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
