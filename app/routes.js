//var Todo = require('./models/todo');
const http = require('http');

function getTodos(res) {
  /*  Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });*/
};

var data = [];

function getBulkData(arr,res){

    var url = "http://api.worldweatheronline.com/premium/v1/weather.ashx?q=";

    for(let i=0;arr[i];i++){
        url+=arr[i]+";";
    }
    url+= "&format=json&key=6aacf8851d6b4c3699184223180501&fx=no&mca=no&fx24=no";

console.log(url);
    http.get(url,function(resp){
         var data = '';
 
          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });
 
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            res.json(JSON.parse(data));
          });
    });
}

function getData (res){
    http.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?q=Bengaluru&format=json&key=6aacf8851d6b4c3699184223180501',function(resp){
         var data = '';
 
          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });
 
          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            res.json(JSON.parse(data));
          });
    });
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/getData', function (req, res) {
        // use mongoose to get all todos in the database
       // getTodos(res);

       getData (res);
    
    });

    app.get('/api/getBulkData', function (req, res) {
        // use mongoose to get all todos in the database
       // getTodos(res);
       var cities =["Bengaluru","Delhi","New york","Washington","Ottawa","Berlin","Paris","London","California","Madrid","Beijing","Tokyo"];
       getBulkData (cities,res);
    
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
