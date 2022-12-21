import express from "express";
import routes from "./routes/roomRoutes";
import * as dotenv from 'dotenv';
import DB from './db';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://app.marketled.online"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// bodyparser setup
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// JWT setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});



// routes
routes(app);

// connect DB
DB();




app.get('/', (req,res) => {
    res.send('sales room api')
})

app.listen(PORT, ()=> {
    console.log(`server is running on PORT ${PORT}`)
})