const UsersModel=require('../model/UsersModel')
const OTPModel=require('../model/OTPModel')
const jwt=require('jsonwebtoken')
const SendEmailUtility=require('../utility/EmailSend')
const SendSms=require('../utility/sms')


exports.registration=async(req,res)=>{
try{
    let reqBody=req.body;

    await UsersModel.create(reqBody)
    res.json({stats:"Success",message:"Registration Successfully"})


}catch(err){
    res.json({stats:"Fail",message:err})
}
}

exports.Login = async (req, res) => {
    try {
        let reqBody = req.body;
        let user = await UsersModel.findOne({ mobile: reqBody.mobile });
        
        if (user) {
            if (user.password === reqBody.password) {
                let Payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: reqBody.mobile };
                let token = jwt.sign(Payload, process.env.JWT_SECRET_KEY);
                res.json({ status: "success", message: "Login Successfully", token: token });
            } else {
                res.json({ status: "failed", message: "Incorrect password" });
            }
        } else {
            res.json({ status: "failed", message: "User Not Found" });
        }
    } catch (err) {
        res.json({ status: "failed", message: err });
    }
}

exports.profileRead=async(req,res)=>{
        try{
            let mobile=req.headers["mobile"];
    
            let result = await UsersModel.find({mobile:mobile})
    
            res.json({stats:"Success",data:result})
        
        
        }catch(err){
            res.json({stats:"Fail",message:err})
        }
    }


    exports.verifyMobile = async (req, res) => {
        try {
            const { mobile } = req.params;
            let user = await UsersModel.find({ mobile: mobile });
            
            if (user.length > 0) {
                // Check if there's an active OTP for this mobile number sent within the last 2 minutes
                let recentOTP = await OTPModel.findOne({ mobile: mobile, createdAt: { $gt: new Date(Date.now() - 10 * 60 * 1000) } });
                
                if (recentOTP) {
                    return res.json({ status: "failed", message: "An OTP has already been sent recently. Please wait 10 minutes before requesting a new one." });
                }
                let otp = Math.floor(1000 + Math.random() * 9000);
                await SendSms(mobile, `Your OTP is ${otp}`, 'OTP Verification');
                await OTPModel.create({ mobile: mobile, otp: otp, status: "Active" });
                return res.json({ status: "success", message: "OTP Sent Successfully" });
            } else {
                // User not found, respond with failure message
                return res.json({ status: "failed", message: "User Not Found" });
            }
        } catch (err) {
            console.error("Error in verifyMobile:", err);
            return res.status(500).json({ status: "error", message: "An error occurred" });
        }
    };
    

exports.profileUpdate=async(req,res)=>{

    try{
        let mobile=req.headers["mobile"];
        let reqBody=req.body;
        await UsersModel.updateOne({mobile:mobile},reqBody)
        res.json({stats:"Success",message:"Update Successfully"})
    
    
    }catch(err){
        res.json({stats:"Fail",message:err})
    }

   
    
    
}



exports.verifyEmail=async(req,res)=>{
    try {
        const { email } = req.params;
        let user = await UsersModel.find({ email: email });
        
        if (user.length > 0) {
            let otp = Math.floor(100000 + Math.random() * 900000);
            
            await SendEmailUtility(email, `Your OTP is ${otp}`, 'OTP Verification');
            
            await OTPModel.create({ email: email, otp: otp, status: "Active" });
            
            return res.json({ status: "success", message: "OTP Sent Successfully" });
        } else {
            return res.json({ status: "failed", message: "User Not Found" });
        }
    } catch (err) {
        console.error("Error in verifyEmail:", err);
        return res.status(500).json({ status: "error", message: "An error occurred" });
    }
    
}

exports.verifyOTP=async(req,res)=>{
    try {
        const { mobile, otp} = req.params;
        let user = await OTPModel.find({ mobile:mobile, otp:otp, status: "Active" });
        
        if (user.length > 0) {
           
            await OTPModel.updateOne({ mobile: mobile, otp: otp }, { status: "Verified" });
            
            return res.json({ status: "success", message: "OTP Verified Successfully" });
        } else {
            return res.json({ status: "failed", message: "Invalid OTP" });
        }
    } catch (err) {
        console.error("Error in verifyMobile:", err);
        return res.status(500).json({ status: "error", message: "An error occurred" });
    }
}

exports.passwordReset=async(req,res)=>{
    try {
        const { mobile, otp, password} = req.params;
        let user = await OTPModel.find({ mobile:mobile, otp:otp, status: "Verified" });
        
        if (user.length > 0) {
            await OTPModel.updateOne({ mobile: mobile, otp: otp }, { status: "Used" });
            await UsersModel.updateOne({ mobile: mobile }, { password: password });
            
            return res.json({ status: "success", message: "Password Reset Successfully" });
        } else {
            return res.json({ status: "failed", message: "Invalid Request" });
        }
    } catch (err) {
        console.error("Error in verifyMobile:", err);
        return res.status(500).json({ status: "error", message: "An error occurred" });
    }
}

