import * as express from 'express';

class App
{
    public express;
    constructor(public port: number)
    {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() :void {
        const router = express.Router();
        router.get("/",(req,res)=>{
            res.json({message:"LOL"});
        });
        this.express.use("/",router);
    }
    public start(): void {
        express.listen(this.port,(err) => { if(err) {return console.error("xd")} return console.log("start"); } )
    }
}
const app = new App(3000);
app.start();