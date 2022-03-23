# WiFi configuration
WIFI_SSID = '💦💦'
WIFI_PASS = '00000000'

# AWS general configuration
AWS_PORT = 8883
AWS_HOST = 'a2289rrh66d1-ats.iot.us-west-2.amazonaws.com'
AWS_ROOT_CA = '/flash/cert/aws_root.ca'
AWS_CLIENT_CERT = '/flash/cert/aws_client.cert'
AWS_PRIVATE_KEY = '/flash/cert/aws_private.key'

################## Subscribe / Publish client #################
CLIENT_ID = 'Illini-motorsports-fipy'
TOPIC = 'teststruct'
OFFLINE_QUEUE_SIZE = -1
DRAINING_FREQ = 2
CONN_DISCONN_TIMEOUT = 10
MQTT_OPER_TIMEOUT = 5
LAST_WILL_TOPIC = 'PublishTopic'
LAST_WILL_MSG = 'To All: Last will message'
