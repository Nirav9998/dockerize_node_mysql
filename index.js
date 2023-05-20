import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()
const app=express()
app.use(express.json())
app.listen(process.env.PORT,()=>{
    console.log(`server is up on port run localhost:${process.env.PORT}`);
})
let db=mysql.createConnection({host:"mydb",
database:process.env.MYSQL_DATABASE,
port:process.env.DB_PORT,
user:process.env.MYSQL_USER,
password:process.env.MYSQL_PASSWORD,
});
app.post("/createdb",async(req,res)=>{
    try {
        db.query('create table user(id int(10) PRIMARY KEY AUTO_INCREMENT ,name varchar(100),age int(10))',(error,result)=>{
            return res.send(error?error:result)
        })
    } catch (error) {
        console.log("error",error);
    }
})
app.get("/get",async(req,res)=>{
    try {
        db.query('select * from user',(err,result)=>{    
                if(err)
                {
                     return res.status(400).send(err)   
                }
                else
                {
                    return res.send({yourResult:result})
                }
        })
    } catch (error) {
        console.log("error whiel connecting",error);
        return res.status(400).send({error})
    }
})
app.post("/insert",async(req,res)=>{
    try {                               
         db.execute(`insert into user(name,age) values('${req.body.name}','${req.body.age}')`,(err,result)=>{
            if(err)
            {
                console.log("error occured",err);
            }
            return res.send({result})
        })
    } catch (error) {
        console.log("error whiel connecting",error);
    }
})
