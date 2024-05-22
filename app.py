from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

def postMazeData(data):
	caPath = "../certificates/rootCA.der"
	certPath = "../certificates/certificate.pem.crt"
	keyPath = "../certificates/private.pem.key"
	endpoint = "a1uxys8rnu3pls-ats.iot.us-east-1.amazonaws.com"

	payload= '{"state": {"desired": {"mazedata": "'+data+'"}}}'
	r = requests.post(f'https://{endpoint}:8443/things/Jason_CC3200_Part1/shadow', data=payload, cert=(certPath,keyPath,caPath))
	print("POST finished with response", r.status_code)
	print(r.text)

postMazeData("RandomData123")


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



@app.route("/test/")
def test():
	return "Hello world!"