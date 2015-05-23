var five = require('johnny-five'),
    rest = require('restler'),
    board, lcd, button;

board = new five.Board();

var rows = 4,
    cols = 20;

var codes = [
    0x41,0xa0,0x42,0xa1,0xe0,0x45,0xa3,0xa4,0xa5,0xa6,0x4b,
    0xa7,0x4d,0x48,0x4f,0xa8,0x50,0x43,0x54,0xa9,0xaa,0x58,
    0xe1,0xab,0xac,0xe2,0xad,0xae,0x62,0xaf,0xb0,0xb1,0x61,
    0xb2,0xb3,0xb4,0xe3,0x65,0xb6,0xb7,0xb8,0xb9,0xba,0xbb,
    0xbc,0xbd,0x6f,0xbe,0x70,0x63,0xbf,0x79,0xe4,0x78,0xe5,
    0xc0,0xc1,0xe6,0xc2,0xc3,0xc4,0xc5,0xc6,0xc7,0xa2,0xb5
];

var chars = [
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я',
    'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я',
    'Ё', 'ё'
];

function lcdPrint(str) {
    str = '' + str;
    var char;
    var index;
    for (var i=0; i < str.length; i++) {
        char = str[i];
        index = chars.indexOf(char);
        if (index !== -1) {
            lcd.write(codes[index]);
        } else {
            lcd.print(char);
        }
    }
}

board.on('ready', function() {
    var piezo = new five.Piezo(8);

    board.repl.inject({
        piezo: piezo
    });

    // lcd = new five.LCD({
    // // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    //     pins: [4, 5, 10, 11, 12, 13],
    //     rows: rows,
    //     cols: cols
    // });

    button = new five.Button(7);

    // lcd.on("ready", function() {});


    button.on('up', function() {

        console.log('button pressed');
        // Plays a song
        // piezo.play({
        //   // song is composed by an array of pairs of notes and beats
        //   // The first argument is the note (null means "no note")
        //   // The second argument is the length of time (beat) of the note (or non-note)
        //   song: [
        //     ["C4", 1 / 4],
        //     ["D4", 1 / 4],
        //     ["F4", 1 / 4],
        //     ["D4", 1 / 4],
        //     ["A4", 1 / 4],
        //     [null, 1 / 4],
        //     ["A4", 1],
        //     ["G4", 1],
        //     [null, 1 / 2],
        //     ["C4", 1 / 4],
        //     ["D4", 1 / 4],
        //     ["F4", 1 / 4],
        //     ["D4", 1 / 4],
        //     ["G4", 1 / 4],
        //     [null, 1 / 4],
        //     ["G4", 1],
        //     ["F4", 1],
        //     [null, 1 / 2]
        //   ],
        //   tempo: 100
        // });

        //   // Create a standard `led` hardware instance
        //   ledBlue = new five.Led(3);
        //   ledRed = new five.Led(6);
          //
        //   // "strobe" the led in 100ms on-off phases
        //   ledBlue.strobe(100);
        //   ledRed.strobe(100);
        //
        // rest.get('http://devexp.serp.yandex.ru/api/teamcity/build-trigger').on('complete', function(result) {
        //     // console.log(result);
        //     lcd.clear();
        //     lcd.cursor(0,0);
        //     lcdPrint(result.build['$'].buildTypeId);
        //     lcd.cursor(1, 0);
        //     lcdPrint('Номер задачи: ' + result.build['$'].taskId);
        // });
    });

});
