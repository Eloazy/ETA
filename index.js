const express=require('express')
const {createServer}=require('http')
const path=require('path')
const app=express()
const httpServer=createServer(app)
app.use('/', express.static(path.join(__dirname, 'public')))
// -
httpServer.listen(process.env.PORT || 5000, ()=>{
	console.log('[API-Started - Eclipsal program]')
	console.log('in your browser type: localhost:5000/main.html')
})

