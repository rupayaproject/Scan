'use strict'

import { convertHexToFloat } from './utils'
import BigNumber from 'bignumber.js'
const db = require('../models')

let TokenHolderHelper = {
    formatHolder: async (tokenHolder, totalSupply, decimals) => {
        if (totalSupply) {
            totalSupply = new BigNumber(totalSupply)
            let quantity = new BigNumber(convertHexToFloat(tokenHolder.quantity, 16))

            let percentAge = quantity.div(10 ** decimals).div(totalSupply) * 100
            percentAge = percentAge.toFixed(4)
            percentAge = (percentAge.toString() === '0.0000') ? '0.0001' : percentAge
            tokenHolder.percentAge = percentAge
        }

        return tokenHolder
    },

    updateQuality: async (hash, token, quantity) => {
        let holder = await db.TokenHolder.findOne({ hash: hash, token: token })
        if (!holder) {
            // Create new.
            holder = await db.TokenHolder.create({
                hash: hash,
                token: token,
                quantity: 0
            })
        }

        // Convert number to hex.
        quantity = parseFloat(quantity).toString(16)
        let quantityCalc = convertHexToFloat(holder.quantity, 16) +
            convertHexToFloat(quantity, 16)
        let newQuantity = quantityCalc.toString(16)
        if (newQuantity.indexOf('-') >= 0) {
            newQuantity = newQuantity.replace('-', '')
            newQuantity = newQuantity.padStart(64, '0')
            newQuantity = '-' + newQuantity
        } else {
            newQuantity = newQuantity.padStart(64, '0')
        }
        holder.quantity = newQuantity
        holder.quantityNumber = quantityCalc
        holder.save()
    }
}

export default TokenHolderHelper
