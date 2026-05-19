const generateException = (type, message, statusCode) => {
    const error = type === 'TypeError' ? new TypeError(message) : new Error(message);
    error.statusCode = statusCode;
    throw error;
};

export default generateException;