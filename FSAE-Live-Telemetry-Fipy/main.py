from network import LTE
from network import WLAN
import machine
from machine import CAN
import time
import socket
import gc
from lib import *
"""
If you want to connect to LTE with fipy, uncomment the connectLTE() function.
"""
# connectLTE()
#
# wifi_name = "帥杰"
# wifi_password = "00000000"
#
#
# def test_with_wifi(wifi_name,wifi_password,db_name,max_thread=2):
#     if connectWiFi(wifi_name,wifi_password):
#         """
#         The following code connects to our firebase realtime database and put the data into the database "teststruct"
#         """
#         firebase.setURL("https://fsae-live-telemetry-default-rtdb.firebaseio.com/")
#         now = time.time()
#         for id in range(30):
#             local_time = time.localtime()
#             if id<10:
#                 firebase.patch(db_name,{"tag 0{}".format(id): {"id":id,"timestamp":local_time,"data":id}}, bg = False )
#             else:
#                 firebase.patch(db_name,{"tag {}".format(id): {"id":id,"timestamp":local_time,"data":id}}, bg = False )
#         end = time.time()
#         print("took {}".format(end - now))

output = []
firebase.setURL("https://fsae-live-telemetry-default-rtdb.firebaseio.com/")

def can_cb(can_o):
    gc.collect()
    if(gc.mem_free()<1000):
        output.pop(0)
        output.append(can_o.recv())
    else:
        output.append(can_o.recv())

# test_with_wifi(wifi_name,wifi_password,"teststruct/test-3")

can = CAN(0, mode=CAN.NORMAL, baudrate=1000000, pins=('P22', 'P23'))
can_filter_out(can,[0x100,0x610])
can.callback(handler=can_cb, trigger=CAN.RX_FRAME)
id = 0;
while(1):
    if id<10:
        firebase.patch(db_name,{"tag 0{}".format(id): {"id":id,"data":output}}, bg = False )
    else:
        firebase.patch(db_name,{"tag {}".format(id): {"id":id,"data":output}}, bg = False )
    ouptut = []
    id += 1
