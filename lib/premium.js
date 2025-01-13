/*
   _____       _                        _____                 
  / ____|     | |                      |  __ \                
 | (___   __ _| |_ __ _  __ _ _ __  ___| |  | | _____   _____ 
  \___ \ / _` | __/ _` |/ _` | '_ \|_  | |  | |/ _ \ \ / / __|
  ____) | (_| | || (_| | (_| | | | |/ /| |__| |  __/\ V /\__ \
 |_____/ \__,_|\__\__, |\__,_|_| |_/___|_____/ \___| \_/ |___/
                   __/ |                                      
                  |___/                                       
*/
require("../config")
const fs = require('fs')
const toMs = require('ms')


const addPremiumUser = (userId, expired, _dir) => {
if (expired === undefined) {
expired = 'PERMANENT'
} else {
expired = expired
}
let expired_at = 'PERMANENT'
if (expired === 'PERMANENT') {
expired_at = 'PERMANENT'
} else {
expired_at = Date.now() + toMs(expired)
}
const obj = { id: userId, expired: expired_at }
_dir.push(obj)
fs.writeFileSync('./src/premium.json', JSON.stringify(_dir, null, 2))
}

const getPremiumPosition = (userId, _dir) => {
let position = null
Object.keys(_dir).forEach((i) => {
if (_dir[i].id === userId) {
position = i
}
})
if (position !== null) {
return position
}
}

const getPremiumExpired = (userId, _dir) => {
let position = null
Object.keys(_dir).forEach((i) => {
if (_dir[i].id === userId) {
position = i
}
})
if (position !== null) {
return _dir[position].expired
}
}

const checkPremiumUser = (userId, _dir) => {
let status = false
Object.keys(_dir).forEach((i) => {
if (_dir[i].id === userId) {
status = true
}
})
return status
}

const expiredCheck = (conn, _dir) => {
setInterval(() => {
let position = null
Object.keys(_dir).forEach((i) => {
if (Date.now() >= _dir[i].expired) {
position = i
}
})
if (position !== null) {
console.log(`Premium expired: ${_dir[position].id}`)
let txt = `Premium Expired, Terimakasih Sudah Berlangganan Di ${botname}`
conn.sendMessage(_dir[position].id, { text: txt })
_dir.splice(position, 1)
fs.writeFileSync('./src/premium.json', JSON.stringify(_dir, null, 2))
}
}, 1000)
}

const getAllPremiumUser = (_dir) => {
const array = []
Object.keys(_dir).forEach((i) => {
array.push(_dir[i].id)
})
return array
}

module.exports = {
addPremiumUser,
getPremiumExpired,
getPremiumPosition,
expiredCheck,
checkPremiumUser,
getAllPremiumUser
}