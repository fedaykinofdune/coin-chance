/*
 *  Copyright 2014 Ruzihm
 *
 *  This file is part of Coin-chance.
 *
 *  Coin-chance is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Coin-chance is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with Coin-chance.  If not, see <http://www.gnu.org/licenses/>.
 */

// Connect to db
var db = require('./db'),
    mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var chatSchema = mongoose.Schema({
        date: {type: Date, default: Date.now},
        user: {type: Number, ref: 'User'},
        message: String
});

chatSchema.plugin(autoIncrement.plugin, 'Chat');
exports.ChatModel = mongoose.model('Chat', chatSchema);

exports.getLastNMessages = function getLastNMessages(n, cb) {
    var Chat = mongoose.model('Chat');
    Chat.find({}).sort('-date').limit(n).populate('user').exec(cb);
};

exports.formatMessage = function formatMessage(user,msg) {
    return user.displayName + ' (' + user.id + '): ' + msg;
};
