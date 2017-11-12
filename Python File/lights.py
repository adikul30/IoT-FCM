from firebase import firebase
# import json,requests
# import RPi.GPIO as GPIO
# GPIO.setmode(GPIO.BOARD)
# GPIO.setup(12,GPIO.OUT)
# GPIO.setwarnings(False)
# while True:

firebase = firebase.FirebaseApplication('https://it-fcm.firebaseio.com/', None)
result = firebase.get('/automation/light/value',None)
if result=="on" :
		print "light on"
		# GPIO.output(12,1)
else :	
		print "light off"
		# GPIO.output(12,0)