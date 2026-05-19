import validator from 'validator';
import bcrypt from 'bcryptjs';
import tokenGenerator from '../utils/tokenGenerator.js';
import generateException from '../utils/exceptionGenerator.js';

export const createUser = async (email, password, authProfile, conn) => {
    const {
        firstName,
        lastName,
        dob,
        course,
        major,
        address,
        status
    } = authProfile;

    if (!email || !password || !firstName || !lastName) {
        generateException('TypeError', 'Email, password, first name, and last name are required.', 400);
    }

    if (!validator.isEmail(email)) {
        generateException('TypeError', 'Invalid email address.', 400);
    }

    const [existing] = await conn.query('SELECT email FROM `user` WHERE email = ?', [email]);
    if (existing.length > 0) {
        generateException('Error', `The email ${email} is already used.`, 400);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const [newUser] = await conn.query(
        'INSERT INTO `user`(email, pass, firstName, lastName, dob, course, major, address, status) VALUES(?,?,?,?,?,?,?,?,?)',
        [
            email,
            hashedPassword,
            firstName,
            lastName,
            dob || null,
            course || null,
            major || null,
            address || null,
            status || null
        ]
    );

    return newUser;
};

export const updateLegacyStudentId = async (userId, legacyStudentId, conn) => {
    if (!userId || !legacyStudentId) return;

    await conn.query(
        'UPDATE `user` SET legacyStudentId = ? WHERE id = ?',
        [legacyStudentId, userId]
    );
};

export const getLegacyStudentIdByUserId = async (userId, conn) => {
    const [rows] = await conn.query(
        'SELECT legacyStudentId FROM `user` WHERE id = ?',
        [userId]
    );

    if (rows.length === 0) {
        generateException('Error', 'Logged-in user was not found.', 404);
    }

    if (!rows[0].legacyStudentId) {
        generateException('Error', 'This account is not yet linked to a legacy student profile.', 404);
    }

    return rows[0].legacyStudentId;
};

export const login = async (email, password, conn) => {
    if (!email || !password) {
        generateException('TypeError', 'Email and password are required.', 400);
    }

    const [user] = await conn.query(
        'SELECT id, email, pass, firstName, lastName FROM `user` WHERE email = ?',
        [email]
    );

    if (user.length === 0) {
        generateException('Error', `An account with email: ${email} does not exist.`, 404);
    }

    if (!bcrypt.compareSync(password, user[0].pass)) {
        generateException('Error', 'Incorrect password.', 401);
    }

    return tokenGenerator(user[0].id);
};
