#include <LineDriver.h>
#include <LiquidCrystalExt.h>
#include <LiquidCrystalRus.h>

//http://wiki.amperka.ru/схемы-подключения:подключение-текстового-экрана
LiquidCrystalRus lcd(4, 5, 10, 11, 12, 13);

void setup()
{
  lcd.begin(20, 4);
  lcd.clear();
  lcd.print("Здравствуй, мир!");
}

void loop()
{

}
