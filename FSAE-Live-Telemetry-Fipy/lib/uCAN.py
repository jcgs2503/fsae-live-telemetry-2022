from machine import CAN

CAN_SPEED = 1000000
Tx_pin = 'P22'
Rx_pin = 'p23'
QUEUE = 128
ACCEPTED_IDS_LIST = [0x100, 0x200, 0x300, 0x400]
ACCEPTED_IDS_RANGE = [(0x001, 0x010), (0x020, 0x030), (0x040, 0x050)]

def init_can():
    can = CAN(mode=CAN.NORMAL, baudrate=CAN_SPEED, pins=(Tx_pin, Rx_pin), frame_format=CAN.FORMAT_EXT,rx_queue_len=QUEUE)
    return can

"""
If you want to use a list of accepted ids as a filter, set list=True, else, set list=False
"""
def can_filter(can_o,list):
    if(list=True){
        can_o.soft_filter(CAN.FILTER_LIST, ACCEPTED_IDS_LIST)
    }else{
        can_o.soft_filter(CAN.FILTER_RANGE, ACCEPTED_IDS_RANGE)
    }
    return


def print_can(can_o):
    print('CAN Rx:', can_o.recv())
    return

def can_cb(can_0):
    can.callback(handler=print_can(can_o),trigger=CAN.RX_FRAME)
