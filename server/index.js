const express = require('express');
const path = require('path');
const expressVaildator = require('express-validator')
const app = express();

let sequelize = require('./models').sequelize;

let saveHighlight = require('./routes/saveHighlights');
let init = require('./routes/init');
let updateHighlights = require('./routes/updateHighlights');
let readHighlights = require('./routes/readHighlight');
let deleteHighlight = require('./routes/deleteHighlight');
//middle-ware

app.use(express.json())
sequelize.sync();


app.set('port', process.env.PORT || 3000);


app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), 'listen')
})

app.use('/',init);
app.use('/saveHighlight', saveHighlight);
app.use('/updateHighlights', updateHighlights);
app.use('/readHighlight', readHighlights);
app.use('/deleteHighlight', deleteHighlight);
