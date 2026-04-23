import * as AuthService from "../services/authService.js";

export const registerStudent = async (req, res) => {
    try {
        const { firstName, lastname, lastName, dob, course, major, address, status } = req.body;
        const studentProfile = {
            firstName,
            lastName: lastName || lastname,
            dob,
            course,
            major,
            address,
            status
        };

        const result = await AuthService.registerStudent(studentProfile);
        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const loginStudent = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Adapter layer does not handle credential login. Use the auth system login instead.",
    });
};
