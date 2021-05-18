const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);

//커스텀 404페이지

app.use(function(req, res ){
    res.type('text/plain');
    res.status(404);
    res.send('404 NOT FOUND')
})

//커스텀 500페이지 
app.use(function(req, res){
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
})

app.listen(app.get('port'),function(){
    console.log('server started on '+ app.get('port'))
})