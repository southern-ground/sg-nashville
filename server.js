/**
 * Created by fst on 8/2/16.
 */

var express = require('express');
var app = express();

// Allow for static pages to come from the public directory
app.use(express.static(__dirname + '/dist'));

// Build routes:
app.get('/', function(req,res){
    res.use('./dist/index.html');
});
// Start the server:
app.listen(2112, function(){
    console.log('App is listening on port 2112.');
})