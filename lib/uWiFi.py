from network import WLAN
import machine

def connectWiFi(wifi_name, wifi_password):
    wlan = WLAN(mode=WLAN.STA)
    nets = wlan.scan()
    for net in nets:
        if net.ssid == wifi_name:
            print('Network found!')
            wlan.connect(net.ssid, auth=(net.sec, wifi_password), timeout=5000)
            while not wlan.isconnected():
                machine.idle() # save power while waiting
            print('WLAN connection succeeded!')
            break

def disconnectWiFi():
    wlan = WLAN(mode=WLAN.STA)
    wlan.deinit()
