var canvas = this.__canvas = new fabric.StaticCanvas('editor');
// create a rect object
var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var cloneIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A"

var deleteImg = document.createElement('img');
deleteImg.src = deleteIcon;

var cloneImg = document.createElement('img');
cloneImg.src = cloneIcon;

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'blue';
fabric.Object.prototype.cornerStyle = 'circle';

var curSelectedItem = null



let endpoint = "http://localhost:5000/api/"

let tiles = Array(25)

function addSingleTile(r, c) {
	var flat, slope1, slope2, slope3, slope4, coin
	{
		let pathTile = new fabric.Path("M 0 0 L 48 28 L 0 56 L -48 28 L 0 0 z")
		pathTile.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathLeft = new fabric.Path("M -48 28 L -48 512 L 0 576 L 0 56 L -48 28 z")
		pathLeft.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathRight = new fabric.Path("M 48 28 L 48 512 L 0 576 L 0 56 L 48 28 z")
		pathRight.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });

		flat = new fabric.Group([pathTile, pathLeft, pathRight], { visible:true });
	}
	{
		let pathTile = new fabric.Path("M 0 -20 L 48 8 L 0 56 L -48 28 L 0 -20 z")
		pathTile.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathLeft = new fabric.Path("M -48 28 L -48 512 L 0 576 L 0 56 L -48 28 z")
		pathLeft.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathRight = new fabric.Path("M 48 8 L 48 512 L 0 576 L 0 56 L 48 8 z")
		pathRight.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });

		slope1 = new fabric.Group([pathTile, pathLeft, pathRight], { visible:false });
	}
	{
		let pathTile = new fabric.Path("M 0 -20 L 48 28 L 0 56 L -48 8 L 0 -20 z")
		pathTile.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathLeft = new fabric.Path("M -48 8 L -48 512 L 0 576 L 0 56 L -48 8 z")
		pathLeft.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathRight = new fabric.Path("M 48 28 L 48 512 L 0 576 L 0 56 L 48 28 z")
		pathRight.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });

		slope2 = new fabric.Group([pathTile, pathLeft, pathRight], { visible:false });
	}
	{
		let pathTile = new fabric.Path("M 0 0 L 48 28 L 0 36 L -48 8 L 0 0 z")
		pathTile.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathLeft = new fabric.Path("M -48 8 L -48 512 L 0 576 L 0 36 L -48 8 z")
		pathLeft.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathRight = new fabric.Path("M 48 28 L 48 512 L 0 576 L 0 36 L 48 28 z")
		pathRight.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });

		slope3 = new fabric.Group([pathTile, pathLeft, pathRight], { visible:false });
	}
	{
		let pathTile = new fabric.Path("M 0 0 L 48 8 L 0 36 L -48 28 L 0 0 z")
		pathTile.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathLeft = new fabric.Path("M -48 28 L -48 512 L 0 576 L 0 36 L -48 28 z")
		pathLeft.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathRight = new fabric.Path("M 48 8 L 48 512 L 0 576 L 0 36 L 48 8 z")
		pathRight.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });

		slope4 = new fabric.Group([pathTile, pathLeft, pathRight], { visible:false });
	}
	{
		let pathTile = new fabric.Path("M 0 0 L 48 28 L 0 56 L -48 28 L 0 0 z")
		pathTile.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathLeft = new fabric.Path("M -48 28 L -48 512 L 0 576 L 0 56 L -48 28 z")
		pathLeft.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });
		let pathRight = new fabric.Path("M 48 28 L 48 512 L 0 576 L 0 56 L 48 28 z")
		pathRight.set({ fill: 'black', stroke: 'white', strokeWidth: 5 });

		coin = new fabric.Group([pathTile, pathLeft, pathRight], { visible:false });
	}

	let tile = new fabric.Group([flat, slope1, slope2, slope3, slope4, coin], {
		left:208+(c-r)*47,
		top:188+(c+r)*27,
		brow:r,
		bcol:c,
		bheight:1,
		bidx:r*5+c,
		hasControls:false,
		hasBorders:false,
		tileType:0
	});

	let o = tile
	if (o.bidx==0) o.item(o.tileType).item(0).set('fill', 'orange')
	if (o.bidx==24) o.item(o.tileType).item(0).set('fill', 'green')

	tiles[o.bidx] = o

	canvas.add(tile)
	// console.log(tile)
}

function Add() {
	for (let i=0; i<10; i++){
		let r=i, c=0
		if (r>4) {
			c+=r-4
			r=4
		}
		while (r>-1 && c<5) {
			addSingleTile(r, c)
			r--
			c++
		}
	}
}

Add();

let dataLookup = [
	"abcdefghij",
	"klmnopqrst",
	"ABCDEFGHIJ",
	"KLMNOPQRST",
	"uvwxyUVWXY",
	"0123456789",
]



let vue;
let mainVue = new Vue({
	el: '#levelVue',
	data: {
		leaderboardName:"",
		leaderboardData:"",
		res:"",
		sampleData:Array(8),
		userData:Array(8)
	},
	computed: {
		lowest(){
			return this.index==0
		},
	},
	methods: {
		findLetter(x) {
			for (let tileType=0; tileType<6; tileType++) {
				for (let height = 0; height < 10; height++) {
					if (dataLookup[tileType][height] == x)
						return {
							tileType:tileType,
							bheight:height+1,
						}
				}
			}
			return {
				tileType:0,
				bheight:0,
			}
		},
		parseGrid(grid) {
			let res = Array(25)
			
			for (let i=0; i<25; i++) res[i] = vue.findLetter(grid[i])
			return res
		},
		parseData(jsonData) {
			return {
				grid:vue.parseGrid(jsonData.grid),
				leaderboard: {
					user1: {
						name:jsonData.leaderboard.user1.substring(0, 10),
						score:jsonData.leaderboard.user1.substring(11),
					},
					user2: {
						name:jsonData.leaderboard.user2.substring(0, 10),
						score:jsonData.leaderboard.user2.substring(11),
					},
					user3: {
						name:jsonData.leaderboard.user3.substring(0, 10),
						score:jsonData.leaderboard.user3.substring(11),
					},
				}
			}
		},
		setCanvas(data) {
			console.log(tiles)
			console.log(data)
			for (let i=0; i<25; i++) {
				let tile = tiles[i]
				let tileData = data[i]

				tile.tileType = tileData.tileType
				tile.bheight = tileData.bheight

				for (let j=0; j<6; j++) tile.item(j).set('visible', false)

				tile.item(tile.tileType).set('visible', true)
				tile.top = 206 + (tile.bcol+tile.brow)*27 + tile.bheight * -18
				if (tile.bheight == 0)
					tile.item(tile.tileType).item(0).set('fill', '#606060')
				else
					tile.item(tile.tileType).item(0).set('fill', 'black')
				if (tile.bidx==0) tile.item(tile.tileType).item(0).set('fill', 'orange')
				if (tile.bidx==24) tile.item(tile.tileType).item(0).set('fill', 'green')
			}

			canvas.renderAll();
			
		},
		setLeaderboards(data, header) {
			lb.leaderboardName = "Top three scores for " + header
			let string = ""
			for (let i=0; i<3; i++) {
				let user = data["user"+(i+1)]
				if (user.score == "000") continue

				string += "<p>"
				string += (i+1)+": "+user.name+", "+user.score
				string += "</p>"
			}
			if (string=="") string = "<p>No users yet!</p>"
			lb.leaderboardData = string
		},
		sample(i) {
			vue.setCanvas(vue.sampleData[i-1].grid)
			vue.setLeaderboards(vue.sampleData[i-1].leaderboard, "Sample Level "+i)
		},
		user(i) {
			vue.setCanvas(vue.userData[i-1].grid)
			vue.setLeaderboards(vue.userData[i-1].leaderboard, "User Level "+i)
		},
		initializeData() {
			vue.res = "Connecting to server..."
			fetch(endpoint+"getData/").then(res => {
				vue.res = "Parsing data..."
				res.json().then(res => {
					console.log(res)
					for (let i=0; i<8; i++)
						vue.sampleData[i] = vue.parseData(res.state.desired["samplelevel"+(i+1)])
					for (let i=0; i<8; i++) 
						vue.userData[i] = vue.parseData(res.state.desired["userlevel"+(i+1)])
					vue.res = ""
					console.log(vue.sampleData)
					console.log(vue.userData)

				}).catch(err => {
					vue.res = "Unable to parse data!"
					console.log(err)
				})
				
			}).catch(err => vue.res = "Can't connect to server!")
		}
	},
	mounted: function() {
		vue = this
		vue.initializeData()
	}
});

new Vue({
	el: '#sampleVue',
	methods: {
		sample(i) {
			vue.sample(i)
		}
	}
});

new Vue({
	el: '#userVue',
	methods: {
		user(i) {
			vue.user(i)
		}
	}
});

let lb = new Vue({
	el: '#lb',
	data: {
		leaderboardName:"",
		leaderboardData:""
	}
})