const express = require("express");

const bodyParser = require("body-parser");

const nexmo = require("@vonage/server-sdk")

const serverless = require("serverless-http");


//https://musical-sunflower-037a80.netlify.app/


const router = express.Router()

const cors = require("cors");

const app = express()

app.use(cors());

const vonage = new nexmo({
    apiKey: api_key,
    apiSecret: api_secret
  })


router.get("/", (req, res, next) => {
    res.send("Working!")
})

router.post("/sendtext", (req, res, next) => {
    const { text } = req.query
    console.log(text)
    res.send(text);
    const from = "Vonage APIs"
    const to = "Your_Text_Receiving_PhoneNumber"

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
    console.log("Working")
})

app.use('/.netlify/functions/server', router)


module.exports.handler = serverless(app)


const sendtext = (text) => {
    const from = "Vonage APIs"
    const to = Your_Text_Receiving_PhoneNumber

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}
