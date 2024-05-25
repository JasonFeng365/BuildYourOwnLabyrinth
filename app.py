from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

def getShadow():
	caPath = "../certificates/rootCA.der"
	certPath = "../certificates/certificate.pem.crt"
	keyPath = "../certificates/private.pem.key"
	endpoint = "a1uxys8rnu3pls-ats.iot.us-east-1.amazonaws.com"

	# payload= '{"state": {"desired": {"mazedata": "'+data+'"}}}'
	r = requests.get(f'https://{endpoint}:8443/things/Jason_CC3200_Part1/shadow', cert=(certPath,keyPath,caPath))
	print("GET finished with response", r.status_code)
	# print(r.text)

	return eval(r.text)

def postMazeData(payload):
	caPath = "../certificates/rootCA.der"
	certPath = "../certificates/certificate.pem.crt"
	keyPath = "../certificates/private.pem.key"
	endpoint = "a1uxys8rnu3pls-ats.iot.us-east-1.amazonaws.com"

	# payload= '{"state": {"desired": {"mazedata": "'+data+'"}}}'
	r = requests.post(f'https://{endpoint}:8443/things/Jason_CC3200_Part1/shadow', data=str(payload).replace("\'", "\""), cert=(certPath,keyPath,caPath))
	print("POST finished with response", r.status_code)
	print(r.text)

	return r.status_code

payload = {}
payload["state"] = {}
payload["state"]["desired"] = {}
payload["state"]["desired"]["mazedata"] = "Some Python Maze Data?"

def validateCode(code):
	if len(code) != 25: return False
	for x in code:
		if x == 'z' or ord('a') <= ord(x) < ord('z') or ord('A') <= ord(x) < ord('Z'): continue
		return False
	return True
		
@app.route("/api/test/")
def testConnection():
	return "API active"

@app.route("/api/newUserLevel/", methods=['POST'])
def newUserLevel():
	code = request.headers['LevelData']
	level = request.headers['LevelNum']

	if not validateCode(code): return "Invalid code", 400
	if level not in "12345678": return "Invalid level", 400

	level = int(level)
	if level<1 or level>8: return "Invalid level", 400

	print("POST to level", level, "with data", '"'+code+'"')


	if not validateCode(code): return "Invalid code", 400

	payload = {
		"state": {
			"desired": {
				"userlevel"+str(level): {
				# "samplelevel"+str(level): {
					"grid": code,
					"leaderboard": {
						"user1": "           000",
						"user2": "           000",
						"user3": "           000"
					}
				}
			}
		}
	}
	# payload["state"] = {}
	# payload["state"]["desired"] = {}
	# payload["state"]["desired"]["user"+str(level)]

	shadowStatus = postMazeData(payload)
	# print(shadowStatus)

	if shadowStatus != 200: return "Internal error", shadowStatus

	# print(getShadow())

	return "OK", 200
	
	

	# return response


"""
Static GitHub Page
	Sections:
		Home/info
		How to play
		Submit a level
			Sample levels 1-10: GET from local Flask server
			Instructions
			Level editor: POST to local Flask server

Flask server
	GET:
		Call GET to AWS IoT. Get levels, translate to JS format.
	POST:
		Call POST to AWS IoT. Add new data levelNumber : levelData.

CC3200 private API
	GET: Get levels, no POST needed
	POST: Update levels, used in Lambda public API
"""




'''
10 letter username limit
"state": {
	"userlevel1": {
		"grid": "level data string........",
		"leaderboard": {
			"user1": "Username Time",
			"user2": "JASON      0001",
			"user3": "ABCDEFGHIJ 9999"
		},
		"timestamp": 123753423
	},
}
'''