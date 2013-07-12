express = require "express"
app = express()
# app.use(express.static('./'))
app.use("/", express.static(__dirname + "/"))
console.log "App: BSAdmin for theme of admin & dashboard & contents"
console.log "Listening 3002"
app.get "/side/",(req,res)->
	menu = []
	menu.push type:"header",name:"HOME"
	menu.push name:"Dashboard",url:"dashboard",icon:"icon-dashboard"
	menu.push name:"Overview",url:"overview",icon:"icon-home"
	menu.push name:"Updates",url:"updates",count:8,icon:"icon-refresh"

	menu.push type:"header",name:"Contents"
	menu.push name:"Articles",url:"articles",icon:"icon-inbox"

	menu.push type:"header",name:"Admin"
	menu.push name:"Admin",url:"admin",icon:"icon-cogs"

	res.jsonp menu

app.listen 3002