from network import WLAN
import machine

def connectWiFi(wifi_name, wifi_password):
    wlan = WLAN(mode=WLAN.STA)
    nets = wlan.scan()
    print('Searching for wifi...')

    for net in nets:
        if net.ssid == wifi_name:
            print('Network found!')
            wlan.connect(net.ssid, auth=(net.sec, wifi_password), timeout=5000)
            while not wlan.isconnected():
                machine.idle() # save power while waiting
            print('WLAN connection success!')
            return True
    if not wlan.isconnected():
        print("Unable to connect to wifi, please make sure the machine is withint wifi range, and try again later.")
        return False

def test_with_wifi(wifi_name,wifi_password,db_name):
    if connectWiFi(wifi_name,wifi_password):
        """
        The following code connects to our firebase realtime database and put the data into the database "teststruct"
        """
        firebase.setURL("https://fsae-live-telemetry-default-rtdb.firebaseio.com/")

        for id in range(10):
            local_time = time.localtime();
            firebase.patch("teststruct", {"tag {}".format(id): {"id":id,"timestamp":local_time,"data":id}})
            time.sleep(0.5)
