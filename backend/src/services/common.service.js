/**
 * This file contains common utility functions that can be used across the application.
 */

/**
 * createNewRecord(): This function is used to create a new record in the database.
 * @param {object} model - The model to be used for creating a new record.
 * @param {object} data - The data to be used for creating a new record.
 * @returns {object} - The record created in the database.
 */
module.exports.createNewRecord = async (model, data, raw = false) => {
    try {
        const record = await model.create(data);
        if(raw) {
            return record;
        }
        return record ? JSON.parse(JSON.stringify(record)) : false;
    } catch (error) {
        console.log("common.js: createNewRecord(): error: ", error);
        return false;
    }
};

/**
 * findByCondition(): This function is used to find a record in the database based on a condition.
 * @param {object} model - The model to be used for querying the database.
 * @param {object} condition - The condition to be used for querying the database.
 * @param {object} attributes - The attributes to be returned from the database.
 * @param {boolean} raw - Whether to return the raw data from the database or not.
 * @returns {object} - The record found in the database.
 */
module.exports.findByCondition = async (model, condition, attributes, raw = false) => {
    try {
        const record = await model.findOne({
            where: condition,
            ...(attributes !== undefined && attributes.length > 0 && {
                attributes,
            }),
        });

        if(raw) {
            return record;
        }

        return record ? JSON.parse(JSON.stringify(record)) : false;
    } catch (error) {
        console.log("common.js: findByCondition(): error: ", error);
        return false;
    }
};

/**
 * findByPrimaryKey(): This function is used to find a record in the database based on its primary key.
 * @param {object} model - The model to be used for querying the database.
 * @param {number} id - The primary key of the record to be found.
 * @param {object} attributes - The attributes to be returned from the database.
 * @param {boolean} raw - Whether to return the raw data from the database or not.
 * @returns {object} - The record found in the database.
 */
module.exports.findByPrimaryKey = async (model, id, attributes, raw = false) => {
    try {
        const record = await model.findByPk(id, {
            ...(attributes !== undefined && attributes.length > 0 && {
                attributes,
            }),
        });

        if(raw) {
            return record;
        }

        return record ? JSON.parse(JSON.stringify(record)) : false;
    } catch (error) {
        console.log("common.js: findByPrimaryKey(): error: ", error);
        return false;
    }
};

/**
 * saveRecord(): This function is used to save a record in the database.
 * @param {object} record - The record to be saved in the database.
 * @returns {object} - The record saved in the database.
 */
module.exports.saveRecord = async (modelInstance, raw = false) => {
    try {
        const savedRecord = await modelInstance.save();
        if(raw) {
            return savedRecord;
        }
        return savedRecord ? JSON.parse(JSON.stringify(savedRecord)) : false;
    } catch (error) {
        console.log("common.js: saveRecord(): error: ", error);
        return false;
    }
};

/**
 * Deletes a record from a model based on a condition.
 * @param {Object} model - The model to delete a record from.
 * @param {Object} condition - The condition to identify the record to delete.
 * @param {boolean} [force=false] - Whether to force the deletion or not.
 * @returns {Promise<number|boolean>} - The number of deleted records or false if an error occurs.
 */
exports.deleteQuery = async (model, condition, force = false) => {
    try {
        const records = await model.destroy({ where: condition, force });
        return records ? JSON.parse(JSON.stringify(records)) : false;
    } catch (error) {
        console.log("common.js: deleteQuery(): error: ", error);
        return false;
    }
};
