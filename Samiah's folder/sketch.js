let scoreboard = {  }
let names2 = document.getElementById("names")
let x
let y
let direction
let score
let level
let enemies
let speed
let time
let homie
let nibbs = []
 

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAY9psJpCQTMIUZiaXSt2dfAijOBGexN54",
    authDomain: "samiah-pro.firebaseapp.com",
    databaseURL: "https://samiah-pro.firebaseio.com",
    projectId: "samiah-pro",
    storageBucket: "samiah-pro.appspot.com",
    messagingSenderId: "986542161983",
    appId: "1:986542161983:web:d0d97f767fc5bbdf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database = firebase.database()


function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width/1054
  x= 527
  y= 100
  
  a = [ 377 ]
  b = [ 400 ]

  e=527
  f=600
  direction=[1,1,1,1,1,1]
  score=0
  lives=3
  level=1
  enemies=1
  speed=5
  time=10
  	
	



}      


function draw() {
  if (time > 0) {

  background(238,130,238);
  
  homie.size(2*50*s, 2*50*s)
  homie.position((527 - homie.width/2)*s, 100 - homie.height/2)

  circle(x*s, y, 50*s);
  fill(176,224,230);
  
  if (touches.length == 0)   {
  if (keyIsDown(LEFT_ARROW)) {
    x = x - 5
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 5
  }
  if (keyIsDown(DOWN_ARROW)) {
    y = y + 3
  }
  if (keyIsDown(UP_ARROW)) {
    y = y - 3
  }
  }
  else { 
	x = touches[0].x
	y = touches[0].y
}
	  
	  
	  
nibbs[i].size(2*10*s, 2*10*s)
nibbs[i].position((377 - nibbs[i].width/2)*s, 400 - nibbs[i].height/2)  
for(i=0; i<enemies; i=i+1) {  
      circle(a[i]*s, b[i], 10*s);
      fill(148,0,211);
      a[i]= a[i] + 5 * direction[i] 
      if ( a[i] > width || a[i] < 0) {
        direction[i] = direction[i]*  -1 
    }
  if (dist( x*s, y, a[i]*s, b[i]) < 50*s + 8*s) {
	lives = lives - 1
    
  }
  if (dist( x*s, y, a[i]*s, b[i]) < 50*s + 8*s) {
	x = 377
    y = 100
  } 
}  
  circle(e*s, f, 20*s);
  fill(124,252,0);
  
  text("Score: " +score, 50, 50)
  
  

  text("Lives: " +lives, 50, 70)
  
  if (dist( x*s, y, e*s, f) < 50*s + 20*s) {
	score = score + 1
  }   



 text("Level: " +level, 50, 90) 
  
 if (score > 100 && level == 1) {
    enemies = enemies + 2
    level = 2
    a.push.apply(a, [248, 357])
    b.push.apply(b, [300, 500])  
    x=377
    y=100
  }
  
 if (score > 200 && level == 2) {
    enemies = enemies + 2
    level = 3
    a.push.apply(a, [476, 377])
    b.push.apply(b, [200, 470])  
    x=677
    y=100
  }
  
  if (score > 300 && level == 3) {
    enemies = enemies + 3
    level = 4
    a.push.apply(a, [157, 289])
    b.push.apply(b, [350, 380])  
    x=577
    y=100
  }
  
  text("Time: " +time.toFixed(0), 50, 110)
  time = time-0.03
  
}
  else {
    names.innerHTML = "Name? <input id='end'><button onclick='restart()'>Restart</button><button onclick=generate_alltime_leaderboard()>"
	noLoop()


}

}

function restart() {
  let end = document.getElementById("end")
  name = end.value
  database.ref(name).set(score)
  if (name != "") { 
    scoreboard[name] = score
	}

    alert("Scoreboard:"+JSON.stringify(scoreboard,null,1)) 
	time = 10
    score = 0
    level = 1
	lives = 3
    enemies = 1
	loop()
	names2.innerHTML = ""
	generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 5) {
    let leaderboard = { }
    for (i=0; i<5; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()


