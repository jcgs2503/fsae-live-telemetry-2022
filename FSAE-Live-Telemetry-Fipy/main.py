from network import LTE
from network import WLAN
import machine
from machine import CAN
import time
import socket
import gc
from lib import *
import binascii
import config
"""
If you want to connect to LTE with fipy, uncomment the connectLTE() function.
"""
# connectLTE()
#
wifi_name = "💦💦"
wifi_password = "00000000"
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

# connectWiFi(wifi_name, wifi_password)
# firebase.setURL("https://fsae-live-telemetry-default-rtdb.firebaseio.com/")
output = []


def can_cb(can_o):
    gc.collect()
    if(gc.mem_free() < 1000):
        output.pop(0)
        output.append(
            {"id": can_o.recv()[0], "data": binascii.hexlify(can_o.recv()[1])})
    else:
        output.append(
            {"id": can_o.recv()[0], "data": binascii.hexlify(can_o.recv()[1])})


# test_with_wifi(wifi_name,wifi_password,"teststruct/test-3")
#
#
# can = CAN(0, mode=CAN.NORMAL, baudrate=1000000, pins=('P22', 'P23'))
# can_filter_out(can, [0x100, 0x610])
# can.callback(handler=can_cb, trigger=CAN.RX_FRAME)
# id = 0
#
# while(1):
#     if id < 10:
#         # firebase.patch("On Car Test/test-1",
#         #                {"tag 0{}".format(id): {"id": id, "data": output}}, bg=False)
#     else:
#         firebase.patch("On Car Test/test-1",
#                        {"tag {}".format(id): {"id": id, "data": output}}, bg=False)
#     ouptut = []
#     id += 1
#     time.sleep(0.5)


# user specified callback function
def customCallback(client, userdata, message):
    print("Received a new message: ")
    print(message.payload)
    print("from topic: ")
    print(message.topic)
    print("--------------\n\n")

# configure the MQTT client
pycomAwsMQTTClient = AWSIoTMQTTClient(config.CLIENT_ID)
pycomAwsMQTTClient.configureEndpoint(config.AWS_HOST, config.AWS_PORT)
pycomAwsMQTTClient.configureCredentials(config.AWS_ROOT_CA, config.AWS_PRIVATE_KEY, config.AWS_CLIENT_CERT)

pycomAwsMQTTClient.configureOfflinePublishQueueing(config.OFFLINE_QUEUE_SIZE)
pycomAwsMQTTClient.configureDrainingFrequency(config.DRAINING_FREQ)
pycomAwsMQTTClient.configureConnectDisconnectTimeout(config.CONN_DISCONN_TIMEOUT)
pycomAwsMQTTClient.configureMQTTOperationTimeout(config.MQTT_OPER_TIMEOUT)
pycomAwsMQTTClient.configureLastWill(config.LAST_WILL_TOPIC, config.LAST_WILL_MSG, 1)

#Connect to MQTT Host
if pycomAwsMQTTClient.connect():
    print('AWS connection succeeded')

# Subscribe to topic
pycomAwsMQTTClient.subscribe(config.TOPIC, 1, customCallback)
time.sleep(2)

# Send message to host
loopCount = 0
while loopCount < 8:
    pycomAwsMQTTClient.publish(config.TOPIC, "New Message " + str(loopCount), 1)
    loopCount += 1
    time.sleep(5.0)
