var five = require('johnny-five'),
    board, lcd;

var rows = 4,
    cols = 20;

board = new five.Board();

board.on('ready', function() {

    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    lcd = new five.LCD({
        pins: [4, 5, 10, 11, 12, 13],
        rows: rows,
        cols: cols
    });

    lcd.on('ready', function() {

        var frame = 1,
          col = 0,
          row = 0;

        var delay = 300;

        lcd.useChar('runninga');
        lcd.useChar('runningb');

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

        lcd.clear();
        lcdPrint('Привет!');

        var laps = 0;
        var timer;

        // погнали
        marathon(0);

        function marathon(n) {
            lcd.clear();
            lcdPrint('Побежали?');
            // govnokod
            setTimeout(function() {
                lcdPrint(' 3 ');
                setTimeout(function() {
                    lcdPrint(' 2 ');
                    setTimeout(function() {
                        lcdPrint(' 1 ');
                        setTimeout(function() {
                            run(n);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 2000);
            // через минуту новый круг
            setTimeout(function() {
                if (timer) {
                    clearTimeout(timer);
                }
                laps++;
                marathon(n + 1);
            }, delay * rows * cols + 5000);
        }

        function run(lap) {
            lcd.clear().cursor(row, col).print(':running' + (++frame % 2 === 0 ? 'a' : 'b') + ':');

            if (++col === lcd.cols) {
                col = 0;

                if (++row === lcd.rows) {
                    row = 0;
                }
            }
            if (lap === laps) {
                timer = setTimeout(function() {
                    run(lap);
                }, delay);
            }
        }

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

    });

});
