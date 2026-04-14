import * as userModel from "../.models/UserModel.js"



export const register = async (req, res) => {
    const {
        name,
        birthdate,
        address,
        program,
        studentStatus,
        email,
        password} = req.body;
//get connection
    try {
        const userProfile = { name, birthdate, address, program, studentStatus };
        const user = await userModel.createUser(userProfile, email, password);
        res.status(201).json({success:true , message:user})
    }catch(err){
        console.log(err);
        res.status(400).json({success:false, message:err.messag})
    }
}
export const login = async (req, res) => {
    const{email, password} = req.body;

    try {
        const token = await userModel.login(email, password);
        res.status(200).json({success:true , message:`welcome user ${token}`, token})
    }catch(err){
        console.log(err);
        res.status(400).json({success:false, message:err.message})
    }
}