
var express = require('express');    
var bodyParser = require('body-parser');    
var QRCode = require('qrcode');    

//initialize app    
var app = express();    
    
//set the template engine    
app.set('view engine','ejs'); 

//include styles folder
app.use(express.static(__dirname + "/public"));
    
//fetch data from the reuqest    
app.use(bodyParser.urlencoded({extended:false}));    
    
//default page load    
app.get('/',(req,res)=>{
    res.render('home',{data : ''});    
});    
    
//get data using body-parser and generate qr-code
app.post('/',(req,res)=>{    
    var newurl = req.body.url;
    if(newurl!=''){    
        QRCode.toDataURL(newurl,function (err, QRCode) {  
            if(err){
                console.log(err);
            } 
            res.render('home',{data : QRCode, url : newurl}); 
        });    
    }else{    
        res.render('home',{data : ''});    
    } 
});    
    
//assign port    
var port  = process.env.PORT || 3000;    
app.listen(port,()=>console.log('server running at '+port)); 