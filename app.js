const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const routes = require('./routes');
app.use(express.static('public'))


var locals = {
    title: 'personajes',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'},
        { name: 'fermione'}
    ]
};
app.set('view engine', 'html');
app.engine('html', nunjucks.render); 
nunjucks.configure('views'); 


// nunjucks.configure('views',{noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    console.log(err);
});

function loggingMiddleware(req, res, next){
    console.log(req['method']);
    console.log(req['url']);
    next();
}

app.use('/',routes);
app.use(loggingMiddleware)

// app.get('/', (req, res, next)=>{
//     res.render('index', locals)
//     //res.send('hola')
// })
var port = 3000;


app.listen(port, ()=>{
    console.log('listening  on port 3000'); 
})