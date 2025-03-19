//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import {dirname, parse} from "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const password1 = "ILoveprogramming";

const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile(_dirname + "/public/index.html");
    //console.log(_dirname + "/public/index.html");
  });

  
//req.body.password is already a string, not an object.
//You don’t need destructuring ({ password }).
  app.post('/check', (req, res) => {
    //const {password2} = req.body.password;
    const password2 = req.body.password;

    if(password2 === password1){
        res.sendFile(_dirname + "/public/secret.html");
    }else{
        res.send(`<p style="color:red;">Incorrect password. Try again!`);
        
    
    }
    
  });

  app.get("/secret", (req, res) => {
    res.sendFile(_dirname + "/public/secret.html");
  });


app.listen(port, () => {
    console.log(`listening on port ${port}`);
  })