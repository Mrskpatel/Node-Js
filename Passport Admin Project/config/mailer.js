const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "kasundrasarthi72@gmail.com",
        pass : "xkuebgabfzobozrx"
    }
})

module.exports.sendOtp = (to , otp) => {
    let mailOption ={
        from : "kasundrasarthi72@gmail.com",
        to : to,
        subject : "Your OTP is here",
        text : `Your OTP is ${otp}`
    }
    transport.sendMail(mailOption , (err) => {
        err && console.log(err);
    })
}   