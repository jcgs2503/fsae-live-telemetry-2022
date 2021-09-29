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
            print('WLAN connection succeeded!')
            return True
    if not wlan.isconnected():
        print("Unable to connect to wifi, please make sure the machine is withint wifi range, and try again later.")
        return False
