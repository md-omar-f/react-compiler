const express = require("express");
const cors = require("cors");
const qs = require('qs');
const Axios = require("axios");
const app = express();
const PORT = 8000;
 
app.use(cors());
app.use(express.json());
 
app.post("/compile", (req, res) => {
    //getting the required data from the request
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;
 
    if (language === "python") {
        language="py"
    }

    let data = qs.stringify({
            "code": code,
            "language": language,
            "input": input
        });
 
    // let data = ({
    //     "code": code,
    //     //"language": language,
    //     "input": input
    // });
    let config = {
        method: 'post',
        url: 'https://api.codex.jaagrav.in',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'X-RapidAPI-Key': '11a8129929msh3aa605040ebfd37p155153jsndf14d482f401',
            //'X-RapidAPI-Host': 'easy-compiler-api.p.rapidapi.com'
        },
        data: data
    };
    //calling the code compilation API
    Axios(config)
        .then((response)=>{
            res.send(response.data)
            console.log(response.data)
        }).catch((error)=>{
            console.log(error);
        });
})
 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});