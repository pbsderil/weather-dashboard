const http = require('http');
var bodyParser = require('body-parser');
var express = require('express');


var data = [];

function getBulkData(arr,res){

    var url = "http://api.worldweatheronline.com/premium/v1/weather.ashx?q=";

    for(let i=0;arr[i];i++){
        url+=arr[i]+";";
    }
    url+= "&format=json&key=6aacf8851d6b4c3699184223180501&fx=no&mca=no&fx24=no";

    http.get(url,function(resp){
         var data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            res.json(JSON.parse(data));
          });
    });
}

function getData (loc,res){
    http.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?q='+loc+'&format=json&key=6aacf8851d6b4c3699184223180501',function(resp){
         var data = '';

          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => {
            res.json(JSON.parse(data));
          });
    });
}

module.exports = function (app) {

    app.use( bodyParser.json() );     
    app.use(bodyParser.urlencoded({     
      extended: true
    }));

    app.use(express.json()); 

    // api ---------------------------------------------------------------------

    app.post('/api/getData', function (req, res) {

        console.log(req.body.loc)
        getData (req.body.loc,res);
    
    });

    app.get('/api/getBulkData', function (req, res) {
       var cities =["Bengaluru","Delhi","New york","Washington","Ottawa","Berlin","Paris","London","California","Madrid","Beijing","Tokyo"];
       getBulkData (cities,res);
    
    });


    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
