import express from "express";
import routes from "./src/routes/roomRoutes";
import * as dotenv from 'dotenv';
import DB from './db';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({origin: process.env.FRONT_URL}))
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