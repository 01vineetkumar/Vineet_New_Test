const regist = require('../model/registration')
const Otp = require('../model/otp')
const utility = require('../Utility/utility')
const jwt = require('jsonwebtoken')
const temp = require('../model/tamplate')
const Payment = require('../model/pay')
const Update = require('../model/update')


exports.register = async (req, res) => {
    try {
        let user = await regist.findOne({ phone: req.body.phone })
        if (user) {
            return await utility.failure(res, user, "this user is already exist")
        }
        let user1 = await regist.findOne({ email: req.body.email })
        if (user1) {
            return await utility.failure(res, user1, "this user is already exist")
        }
        const check = await regist.create(req.body)
        return await utility.success(res, check, "your account has been created")
    } catch (error) {
        console.log(error)
    }
}

exports.otp = async (req, res) => {
    try {
        let data = {}
        data.phone = req.body.phone
        const code = await utility.OTP(req, res)
        data.expireat = moment().add(10, 'minutes')
        const check1 = await Otp.create(data)
        return res.send(check1)
    } catch (error) {
        console.log(error)
    }
}

exports.verifyotp = async (req, res) => {
    let check = await Otp.findOne({
        phone: req.body.phone, code: req.body.code,
        expireat: {
            $gt: new Date()
        }
    })
    if (check) {
        return await utility.failure(res, check, "invalid otp")
    }
    let user = await regist.findOne({ phone: req.body.phone }).lean()
    if (user) {
        var token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: 86400
        })
        user.token = token
    }
    return await utility.success(res, user)
}

exports.template = async (req, res) => {
    try {
        let check = await regist.findOne({ _id: req.body.regist })
        if (check) {
            return await utility.failure(res, check, "invalid")
        }
        console.log("File", req.file)
        req.body.file = req.file.filename
        req.body.filetype = req.file.mimetype

        req.body.user = req.user._id

        let check1 = await temp.findOne({ _id: req.user._id })
        if (check1) {
            const file = new temp(req.body)
            await file.save()
        }

        console.log(req.user)

        res.status(200).send("uploded")
    } catch (error) {
        res.status(404).send(error.message);
    }
}

exports.mytemplate = async (req, res) => {
    try {
        let { page, size } = req.query;

        if (!page) {
            page = 1;
        }

        if (!size) {
            size = 10;
        }

        let skip = req.query.skip
        let limit = req.query.limit

        // const limit = parseInt(5)

        // We pass 1 for sorting data in 
        // ascending order using ids
        const user = await temp.find().sort(
            { votes: 1, _id: 1 }).skip(skip).limit(limit)
        res.send({
            page,
            size,
            Info: user,
        });
        return await utility.success(res, user)
    } catch (error) {
        console.log("err", error);
    }
}

exports.update_template = async (req, res) => {
    let data = await temp.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    return await utility.success(res, data, "updated Successfully ")
}

exports.Pay = async (req, res) => {
    try {
        let pay = await Payment.create(req.body)
        return await utility.success(res, pay, "paid successfully")
    } catch (error) {
        console.log(error)
    }
}

exports.Update = async (req, res) => {
    try {
        let check = await Update.create(req.body)
        return await utility.success(res, check, "paid successfully")
    } catch (error) {
        console.log(error)
    }
}

exports.getPay = async (req, res) =>{
    let user = await Payment.aggregate([
        {
            $lookup: {
            from: "Update",
            localField: "updateId",
            foreignField: "_id",
            as: "customer details",
            },
        },
        ])
    return await utility.success(res,user, "order placed")
}