from network import LTE
from network import WLAN
import machine
from machine import CAN
import time
import socket
import gc
from lib import *
import binascii
import ujson

"""
If you want to connect to LTE with fipy, uncomment the connectLTE() function.
"""
# connectLTE()

wifi_name = "💦💦"
wifi_password = "00000000"
connectWiFi(wifi_name, wifi_password)

firebase.setURL("https://fsae-live-telemetry-default-rtdb.firebaseio.com/")
output = []

def takeCreatedTime(e):
    return firebase.VAR1[e]['init']['createdTimeStamp'];

def can_cb(can_o):
    gc.collect()
    # if(gc.mem_free() < 1000):
    #     output.pop(0)
    #     output.append({"id": can_o.recv()[0], "data": binascii.hexlify(can_o.recv()[1]), "timestamp_ms": time.ticks_diff(time.ticks_ms(), start)})
    # else:
    #     output.append({"id": can_o.recv()[0], "data": binascii.hexlify(can_o.recv()[1]), "timestamp_ms": time.ticks_diff(time.ticks_ms(), start)})
    #
    rcv = can_o.recv()
    output.append({"id": rcv[0], "data": rcv[1], "timestamp_ms": time.ticks_diff(time.ticks_ms(), start)})

firebase.get("On Car Test","VAR1")
collectingDataName = list(firebase.VAR1.keys())
collectingDataName.sort(key=takeCreatedTime, reverse=True)
patchAddress = "On Car Test/{}".format(collectingDataName[0])
firebase.put("CollectingDataName",collectingDataName[0],bg=False)

initialTimeStamp = ujson.loads(urequests.get("http://worldtimeapi.org/api/ip").content.decode('utf-8'))['unixtime']
start = time.ticks_ms()

can = CAN(0, mode=CAN.NORMAL, baudrate=1000000, pins=('P22', 'P23'), rx_queue_len=1280)
can.callback(handler=can_cb, trigger=CAN.RX_FRAME)
can.soft_filter(CAN.FILTER_LIST,[0x301,0x020,0x300])

id = 0
while(1):
    firebase.patch(patchAddress,{"{}".format(time.ticks_diff(time.ticks_ms(), start)+initialTimeStamp*1000): {"id": id, "data": output}}, bg=False)
    output = []
    id += 1
    time.sleep(0.5)
