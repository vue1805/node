var express = require('express')
var app = express()
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'laoyao',
	password: '123456',
	database: '1805'
});
// 专门处理post请求的
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//路由
app.post('/register', function(req, res) {
	connection.connect(); //进行连接
	//跨域
	res.append("Access-Control-Allow-Origin", "*");
	console.log(req.body);
	connection.query("INSERT INTO `students`(`name`, `skill`) VALUES (" +`'${req.body.name}','${req.body.password}'`+")", function(error, results, fields) {
		if(error) throw error;
		console.log(results);
		res.send(JSON.stringify({
			results: results
		}));
	});
	connection.end();
})
app.listen(3000);