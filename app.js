const express = require('express');
const nunjucks = require('nunjucks');
const app = express();



function loggingMiddleware(req, res, next){
    console.log(req['method']);
    console.log(req['url']);
     next();
}
app.use(loggingMiddleware)

app.get('/usuarios', (req, res, next)=>{
    res.send('hola')
})

app.set('view engine', 'html');
app.engine('html', nunjucks.render); 
nunjucks.configure('views'); 

var locals = {
    title: 'personajes',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'},
        { name: 'fermione'}

    ]
};

//nunjucks.configure('views',{noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    console.log(output);
});


var port = 3000;

app.listen(port, ()=>{
console.log('listening  on port 3000'); 
})