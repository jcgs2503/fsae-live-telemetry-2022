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

"""
The following code connects to the wifi with wifi_name and wifi_password.
"""
wifi_name = "wifi_name"
wifi_password = "wifi_password"
test_with_wifi(wifi_name,wifi_password,"teststruct")
