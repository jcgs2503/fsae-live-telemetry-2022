from network import LTE
from network import WLAN
import machine
import time
import socket

from lib import *
"""
If you want to connect to LTE with fipy, uncomment the connectLTE() function.
"""
# connectLTE()

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

wifi_name = "帥杰"
wifi_password = "00000000"
test_with_wifi(wifi_name,wifi_password,"teststruct")
