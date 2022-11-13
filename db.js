import mongoose from "mongoose";


const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const DB =  () => {
    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log("CONNECTED to base successfully");
    } catch (error) {
        console.log(error)
        console.log('Could not connect to Database');
    }
}

export default DB;