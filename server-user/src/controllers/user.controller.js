"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const redis_1 = require("../modules/redis");
const user_1 = require("../schemas/user");
const constants_1 = require("../../../shared/constants/constants");
exports.userController = {
    getAllowedFields: ['_id', 'username', 'profileImg', 'country', 'followers', 'following', 'membershipStartDate', 'description', 'balance'],
    async find(reqUser, userId, type = constants_1.USER_FETCH_TYPE_SLIM, forceReload = false) {
        if (!userId)
            throw new Error('user id is required');
        let REDIS_KEY = constants_1.REDIS_USER_PREFIX + userId;
        let fieldsArr = [];
        let user;
        switch (type) {
            case constants_1.USER_FETCH_TYPE_ACCOUNT_DETAILS:
                fieldsArr = ['country', 'balance', 'leverage'];
                break;
            case constants_1.USER_FETCH_TYPE_PROFILE_SETTINGS:
                fieldsArr = ['email', 'country', 'leverage'];
                break;
            case constants_1.USER_FETCH_TYPE_SLIM:
            default:
                fieldsArr = ['country'];
                break;
        }
        if (!user) {
            let fieldsObj = {};
            fieldsArr.forEach(field => fieldsObj[field] = 1);
            user = (await user_1.User.aggregate([
                {
                    $match: {
                        _id: mongoose_1.Types.ObjectId(userId)
                    }
                },
                {
                    $project: Object.assign({}, fieldsObj)
                },
                {
                    $limit: 1
                }
            ]))[0];
        }
        if (user) {
            Object.keys(user)
                .filter(key => !fieldsArr.includes(key))
                .forEach(key => delete user[key]);
        }
        return user;
    },
    async findMany(reqUser, params) {
        const limit = params.limit || 20;
        const sort = params.sort || -1;
        // Filter allowed fields
        const fields = {};
        (params.fields || this.getAllowedFields).filter(field => this.getAllowedFields.includes(field)).forEach(field => fields[field] = 1);
        const data = await user_1.User.aggregate([
            {
                $project: Object.assign({}, fields)
            },
            {
                $limit: limit
            },
            {
                $sort: {
                    _id: sort
                }
            }
        ]);
        return data;
    },
    async create(params) {
        let userData = {
            email: params.email,
            username: params.username,
            password: params.password,
            passwordConf: params.passwordConf,
            profileImg: params.profileImg,
            description: params.description,
            country: params.country
        };
        if (!userData.email || !userData.username || !userData.password || !userData.passwordConf)
            throw 'Missing attributes';
        // use schema.create to insert data into the db
        const user = await user_1.User.create(userData);
        redis_1.client.publish('user-created', JSON.stringify({
            _id: user._id,
            username: user.username
        }), (error) => {
            if (error)
                console.log('REDIS ERROR: ', error);
        });
        return user;
    },
    async getCached(key) {
        return new Promise((resolve, reject) => {
            redis_1.client.get(key, function (err, reply) {
                if (err)
                    reject(err);
                else
                    resolve(JSON.parse(reply));
            });
        });
    },
    // TODO - Filter fields
    async update(reqUser, userId, params) {
        // Update DB
        const user = await user_1.User.findByIdAndUpdate(userId, params);
        // Update redis and other micro services
        if (user)
            redis_1.client.publish('user-updated', JSON.stringify(user));
    },
    async remove(id) {
    }
};
//# sourceMappingURL=user.controller.js.map