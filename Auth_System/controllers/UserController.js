import connect from "../config/db.js";
import * as UserModel from "../models/UserModel.js";
import * as AuthService from "../../adapter_layer/services/authService.js";

const getBody = (req) => {
    if (!req.body || typeof req.body !== "object") {
        return null;
    }

    return req.body;
};

export const register = async (req, res, next) => {
    const body = getBody(req);

    if (!body) {
        return res.status(400).json({
            success: false,
            message: [{ result: "Request body is missing. In Postman, choose Body > raw > JSON." }]
        });
    }

    const {
        email,
        password,
        pass,
        firstName,
        lastname,
        lastName,
        dob,
        course,
        major,
        address,
        status
    } = body;

    const finalPassword = password || pass;
    const finalLastName = lastName || lastname;

    let conn;
    try {
        conn = await connect();
        const authProfile = {
            firstName,
            lastName: finalLastName,
            dob,
            course,
            major,
            address,
            status
        };

        await UserModel.createUser(email, finalPassword, authProfile, conn);
        await AuthService.registerStudent(authProfile);

        conn.release();
        res.status(201).json({
            success: true,
            message: [{ result: "A new account has been created and synced to the legacy system!" }]
        });
    } catch (e) {
        if (conn) conn.release();
        next(e);
    }
};

export const login = async (req, res, next) => {
    const body = getBody(req);

    if (!body) {
        return res.status(400).json({
            success: false,
            message: [{ result: "Request body is missing. In Postman, choose Body > raw > JSON." }]
        });
    }

    const { email, password, pass } = body;
    let conn;
    try {
        conn = await connect();
        const token = await UserModel.login(email, password || pass, conn);
        conn.release();
        res.status(200).json({
            success: true,
            message: [
                { result: "Login successful!" },
                { token }
            ]
        });
    } catch (e) {
        if (conn) conn.release();
        next(e);
    }
};
