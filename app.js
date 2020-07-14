const request = require('request'),
      path = require("path"),
      http = require('http'),
      express =  require('express'),
      socketIo = require('socket.io'),
      bodyparser = require('body-parser'),
      app = express(),
      server = http.createServer(app),
      io = socketIo(server),
      port = process.env.PORT || 3000;
      var url;

//var store = require('store')
//store.set('user', { name:'Marcus' })
 

//middlewares
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

io.on('connection', socket =>{
	socket.on('data', (mess)=>{
		const api_key = "da30651e4d367d8b262f4894100b482d",
	    app_id = "826d9253",
		url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${mess}&app_id=${app_id}&app_key=${api_key}`;
		request(url, function(err, response,body){
			if(err) {
				console.log('error');
			}
			else{
				var data = JSON.parse(body);
				data.hints.map(hint => {
					let arr = hint.food;
					socket.emit('all_data', arr);
				});
			}
        });
	});
});

server.listen(port, "0.0.0.0", (err, success)=>{
	if(err) console.log('error connection');
	else console.log(`subscriber connected to ${port}`);
});

