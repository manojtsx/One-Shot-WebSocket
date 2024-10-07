import app from './src/app';
import envConfig from './src/config/config';
import connectionToDb from './src/config/db';
import { Server } from 'socket.io';

let io : Server | undefined;
async function startServer(){
    await connectionToDb();
    const port = envConfig.port;
    const server = app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
    io = new Server(server);
    
}
const serverStarted = startServer();
async function getSocketIO(){
    await serverStarted;
    if(!io){
        throw new Error('Socket.io is not initialized');
    }
    return io;
}

export { getSocketIO };

