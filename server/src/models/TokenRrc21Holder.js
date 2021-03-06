'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenRrc21Holder = new Schema({
    hash: { type: String, index: true },
    token: { type: String, index: true },
    tokenDecimals: Number,
    quantity: String,
    quantityNumber: { type: Number, index: true }
}, {
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true },
    versionKey: false
})

module.exports = mongoose.model('TokenRrc21Holder', TokenRrc21Holder)
