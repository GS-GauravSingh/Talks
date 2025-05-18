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
        if (raw) {
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
module.exports.findByCondition = async (
    model,
    condition,
    attributes,
    raw = false
) => {
    try {
        const record = await model.findOne({
            where: condition,
            ...(attributes !== undefined &&
                attributes.length > 0 && {
                    attributes,
                }),
        });

        if (raw) {
            return record;
        }

        return record ? JSON.parse(JSON.stringify(record)) : false;
    } catch (error) {
        console.log("common.js: findByCondition(): error: ", error);
        return false;
    }
};

/**
 * findAllWithCount(): This function is used to find all records in the database based on a condition.
 * @param {object} model - The model to be used for querying the database.
 * @param {object} condition - The condition to be used for querying the database.
 * @param {object} attributes - The attributes to be returned from the database.
 * @param {boolean} raw - Whether to return the raw data from the database or not.
 * @param {number} limit - The number of records to be returned.
 * @param {array} order - The order in which the records should be returned.
 * @param {number} offset - The number of records to be skipped.
 * @returns {Array} - The records found in the database.
 */
module.exports.findAllWithCount = async (
    model,
    condition,
    attributes,
    raw = false,
    limit,
    order,
    offset
) => {
    try {
        const records = await model.findAndCountAll({
            where: condition,
            ...(attributes !== undefined &&
                attributes.length > 0 && {
                    attributes,
                }),
            ...(limit !== undefined && { limit }),
            ...(order !== undefined && { order }),
            ...(offset !== undefined && { offset }),
        });

        if (raw) {
            return records;
        }

        return records ? JSON.parse(JSON.stringify(records)) : false;
    } catch (error) {
        console.log("common.js: findAllByCondition(): error: ", error);
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
module.exports.findByPrimaryKey = async (
    model,
    id,
    attributes,
    raw = false
) => {
    try {
        const record = await model.findByPk(id, {
            ...(attributes !== undefined &&
                attributes.length > 0 && {
                    attributes,
                }),
        });

        if (raw) {
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
        if (raw) {
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

/**
 * findAllByConditionWithAggregateFunction(): This function is used to find all records in the database based on a condition with aggregate function.
 *
 * @param {Object} model
 * @param {Object} condition
 * @param {Array} attributes
 * @param {Boolean} raw
 * @param {Array} groupBy
 * @param {literal} groupCondition
 * @param {Number} limit
 * @param {Array} order
 * @param {Number} offset
 * @returns
 */
exports.findAllWithGroupByAndAggregateFunction = async (
    model,
    condition,
    attributes,
    raw = false,
    groupBy,
    groupCondition,
    limit,
    order,
    offset
) => {
    try {
        const records = await model.findAll({
            where: condition,
            ...(attributes !== undefined &&
                attributes.length > 0 && {
                    attributes,
                }),
            ...(groupBy !== undefined && {
                group: groupBy,
            }),
            ...(groupCondition !== undefined && {
                having: groupCondition,
            }),
            ...(limit !== undefined && { limit }),
            ...(order !== undefined && { order }),
            ...(offset !== undefined && { offset }),
        });

        if (raw) {
            return records;
        }

        return records ? JSON.parse(JSON.stringify(records)) : false;
    } catch (error) {
        console.log(
            "common.js: findAllByConditionWithAggregateFunction(): error: ",
            error
        );
        return false;
    }
};

/**
 * bulkAdd(): This function is used to add multiple records in the database.
 *
 * @param {Object} model - The model to be used for creating a new record.
 * @param {Array} data - array of objects to be added in the database.
 * @returns { Array } - The records added in the database.
 */
exports.bulkAdd = async (model, data) => {
    try {
        const records = await model.bulkCreate(data);
        return records ? JSON.parse(JSON.stringify(records)) : false;
    } catch (error) {
        console.log("common.js: bulkAdd(): error: ", error);
        return false;
    }
};

/**
 * findAllWithOneAssociatedModel(): This function is used to find all records in the database with one associated model.
 * 
 * @param {Object} model - The model to be used for querying the database.
 * @param {Object} associatedModel - The associated model to be used for querying the database.
 * @param {Object} condition - The condition to be used for querying the database.
 * @param {Object} associatedModelCondition - The condition to be used for querying the associated model.
 * @param {Array} attributes - The attributes to be returned from the database.
 * @param {Array} associatedModelAttributes - The attributes to be returned from the associated model.
 * @param {Boolean} raw - Whether to return the raw data from the database or not.
 * @param {Number} limit - The number of records to be returned.
 * @param {Array} order - The order in which the records should be returned.
 * @param {Number} offset - The number of records to be skipped.
 */
exports.findAllWithOneAssociatedModel = async (
    model,
    associatedModel,
    condition,
    associatedModelCondition,
    attributes,
    associatedModelAttributes,
    raw = false,
    limit,
    order,
    offset
) => {
    try {
        const records = await model.findAndCountAll({
            where: condition,
            ...(attributes !== undefined &&
                attributes.length > 0 && {
                    attributes,
                }),
            include: [
                {
                    model: associatedModel,
                    where: associatedModelCondition,
                    ...(associatedModelAttributes !== undefined &&
                        associatedModelAttributes.length > 0 && {
                            attributes: associatedModelAttributes,
                        }),
                    required: true,
                },
            ],
            ...(limit !== undefined && { limit }),
            ...(order !== undefined && { order }),
            ...(offset !== undefined && { offset }),
        });

        if (raw) {
            return records;
        }

        return records ? JSON.parse(JSON.stringify(records)) : false;
    } catch (error) {
        console.log(
            "common.js: findAllWithOneAssociatedModel(): error: ",
            error
        );
        return false;
    }
};
