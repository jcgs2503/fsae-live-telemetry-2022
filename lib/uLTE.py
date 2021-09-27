from network import LTE
import time
import socket

def connectLTE():
    lte = LTE()
    print("Start")
    # print(lte.send_at_cmd("AT+SQNCTM=?"))
    lte.attach(band=20, apn="hologram")
    print("attaching..",end='')
    while not lte.isattached():
        time.sleep(0.25)

        print('.',end='')
        print(lte.send_at_cmd('AT!="fsm"'))         # get the System FSM
    print("attached!")

    lte.connect()
    print("connecting [##",end='')
    while not lte.isconnected():
        time.sleep(0.25)
        print('#',end='')
        #print(lte.send_at_cmd('AT!="showphy"'))
        print(lte.send_at_cmd('AT!="fsm"'))
    print("] connected!")
    print(socket.getaddrinfo('pybytes.pycom.io', 80))

def disconnectLTE():
    lte.deinit()
