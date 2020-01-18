const fs = require('fs')
const path = require('path')
const http = require('http')

const express = require('express')
const app = express()
app.use(express.static('public'))

const multer = require ('multer')
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./public/')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})
const removeFile = (req,res,next)=>{
    fs.exists('./public/image.jpg',function(exists) {
        if(!exists) next()
        else{
            fs.unlink('./public/image.jpg',function (err) {
                if(err) throw err
                else next()
            })

        }
    })
}

app.get('/',(req,res)=>{
})

app.post('/upload',removeFile,upload.single('image'),(req,res)=>{
    res.redirect('/result')
})


app.get('/result',(req,res)=>{
    res.sendFile(__dirname+'/public/result.html')
})

http.createServer(app).listen(8000,()=>console.log("Listening on Port 8000"))