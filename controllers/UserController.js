import connect from '../config/db.js';
import * as UserModel from '../models/UserModel.js';
import * as AuthService from '../../adapter_layer/services/authService.js';

const getBody = (req) => {
    if (!req.body || typeof req.body !== 'object') {
        return null;
    }

    return req.body;
};

export const register = async (req, res, next) => {
    const body = getBody(req);

    if (!body) {
        return res.status(400).json({
            success: false,
            message: [{ result: 'Request body is missing. In Postman, choose Body > raw > JSON.' }]
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
        await conn.beginTransaction();

        const authProfile = {
            firstName,
            lastName: finalLastName,
            dob,
            course,
            major,
            address,
            status
        };

        const newUser = await UserModel.createUser(email, finalPassword, authProfile, conn);
        const legacyStudent = await AuthService.registerStudent(authProfile);
        const legacyStudentId = AuthService.getLegacyStudentId(legacyStudent);

        await UserModel.updateLegacyStudentId(newUser.insertId, legacyStudentId, conn);
        await conn.commit();

        res.status(201).json({
            success: true,
            message: [{ result: 'Account created. Student profile was converted by the adapter layer and synced to the legacy system.' }],
            data: {
                authUserId: newUser.insertId,
                legacyStudentId,
                studentProfile: AuthService.toPortalProfile(legacyStudent)
            }
        });
    } catch (e) {
        if (conn) await conn.rollback();
        next(e);
    } finally {
        if (conn) conn.release();
    }
};

export const login = async (req, res, next) => {
    const body = getBody(req);

    if (!body) {
        return res.status(400).json({
            success: false,
            message: [{ result: 'Request body is missing. In Postman, choose Body > raw > JSON.' }]
        });
    }

    const { email, password, pass } = body;
    let conn;
    try {
        conn = await connect();
        const token = await UserModel.login(email, password || pass, conn);
        res.status(200).json({
            success: true,
            message: [
                { result: 'Login successful.' },
                { token }
            ]
        });
    } catch (e) {
        next(e);
    } finally {
        if (conn) conn.release();
    }
};

export const getProfileByLegacyId = async (req, res, next) => {
    try {
        const { legacyStudentId } = req.params;
        const profile = await AuthService.fetchStudentProfile(legacyStudentId);

        res.status(200).json({
            success: true,
            message: [{ result: 'Student profile fetched from the legacy system through the adapter layer.' }],
            data: profile
        });
    } catch (e) {
        next(e);
    }
};

export const getMyProfile = async (req, res, next) => {
    let conn;
    try {
        conn = await connect();
        const legacyStudentId = await UserModel.getLegacyStudentIdByUserId(req.userId, conn);
        const profile = await AuthService.fetchStudentProfile(legacyStudentId);

        res.status(200).json({
            success: true,
            message: [{ result: 'Your student profile was fetched from the legacy system through the adapter layer.' }],
            data: profile
        });
    } catch (e) {
        next(e);
    } finally {
        if (conn) conn.release();
    }
};
