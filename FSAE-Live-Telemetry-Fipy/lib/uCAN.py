from machine import CAN

"""DEFAULT CONSTANTS"""
CAN_SPEED = 1000000
Tx_pin = 'P22'
Rx_pin = 'p23'
QUEUE = 128
ACCEPTED_IDS_LIST = [0x100, 0x200, 0x300, 0x400]
ACCEPTED_IDS_RANGE = [(0x001, 0x010), (0x020, 0x030), (0x040, 0x050)]
"""END OF DEFAULT CONSTANTS"""

def init_can():
    can = CAN(mode=CAN.NORMAL, baudrate=CAN_SPEED, pins=(Tx_pin, Rx_pin), frame_format=CAN.FORMAT_EXT,rx_queue_len=QUEUE)
    return can

"""
If you want to use a list of accepted ids as a filter, set list=True, else, set list=False
"""
def can_filter(can_o,list):
    if(list=True){
        return can_o.soft_filter(CAN.FILTER_LIST, ACCEPTED_IDS_LIST)
    }else{
        return can_o.soft_filter(CAN.FILTER_RANGE, ACCEPTED_IDS_RANGE)
    }

def print_can(can_o):
    return print('CAN Rx:', can_o.recv())

def can_cb(can_o):
    return can_o.callback(handler=print_can(can_o),trigger=CAN.RX_FRAME)

def can_request(can_o,id):
    return can.send(id=id,rtr=True)
