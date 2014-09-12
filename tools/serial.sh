stty -f /dev/tty.usbmodem1411 cs8 9600 ignbrk -brkint -icrnl -imaxbel -opost -onlcr -isig -icanon -iexten -echo -echoe -echok -echoctl -echoke noflsh -ixon -crtscts
exec 3<> /dev/tty.usbmodem1411
sleep 1
echo "HELL" >&3
cat <&3
exec 3>&-
