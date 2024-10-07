import mongoose from "mongoose";
import envConfig from "./config";

async function connectionToDb(){
    try{
        mongoose.connection.on("connected",()=>{
            console.log('Connected to database');
        })
        await mongoose.connect(envConfig.mongoConnectionString as string)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}


export default connectionToDb