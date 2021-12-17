const config = ('config')

module.exports = {
    success: async(res, data, message = "")=>{
        return res.status(200).send({
            message: message,
            data:data
        })
    },
    failure: async(res, data,message ="")=>{
        return res.status(400).send({
            message: message,
            data: ""
        })
    },
    OTP: async () =>{
        let Otp= Math.random();
        Otp = Otp*1000000;
        Otp = parseInt(Otp)
        console.log("Your OTP is : ", Otp)
    },
}