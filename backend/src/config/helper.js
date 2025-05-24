module.exports.getPagination = ({ page, size }) => {
    const offset = page ? (page - 1) * limit : 0;
    const limit = size ? size : null;
    return { limit, offset };
};
