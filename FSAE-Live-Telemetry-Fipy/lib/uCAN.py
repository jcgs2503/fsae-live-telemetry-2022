from machine import CAN

"""DEFAULT CONSTANTS"""
CAN_SPEED = 1000000
Tx_pin = 'P22'
Rx_pin = 'P23'
QUEUE = 128
ACCEPTED_IDS_LIST = [0x7a4,0x100,0x7a3,0x7a2,0x7a1,0x610,0x4e2,0x4e7,0x4e4,0x4e5,0x17c,0x429,0x42a,0x7a0,0x178,0x174,0x202,0x201,0xf,0x200,0x7fc,0x7fb,0x7fa,0x10,0x12,0x11,0x20]
ACCEPTED_IDS_RANGE = [(0x001, 0x010), (0x020, 0x030), (0x040, 0x050)]
"""END OF DEFAULT CONSTANTS"""

def init_can():
    # can = CAN(mode=CAN.NORMAL, baudrate=CAN_SPEED, pins=(Tx_pin, Rx_pin), frame_format=CAN.FORMAT_EXT,rx_queue_len=QUEUE)
    can = CAN(0, mode=CAN.NORMAL, baudrate=1000000, pins=('P22', 'P23'))
    return can

"""
If you want to use a list of accepted ids as a filter, set list=True, else, set list=False
"""
def can_filter_out(can_o,list):
    filtered_list = []
    for i in ACCEPTED_IDS_LIST:
        if i not in list:
            filtered_list.append(i)
    can_o.soft_filter(CAN.FILTER_LIST, filtered_list) 

#
def can_cb(can_o):
    print(can_o.recv())

def can_request(can_o,id):
    return can.send(id=id,rtr=True)
