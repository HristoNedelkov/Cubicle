const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

function createAccessory(data) {
    let accessory = new Accessory(data)

    return accessory.save()
}

async function getAll() {
    let all = await Accessory.find({}).lean()
     return all 
}
async function addAccessory(id, accessoryId) {
    let acc = await Accessory.findById(accessoryId)
    return Cube.findByIdAndUpdate(id, { $push: { accessories: acc } })
}
async function getOne(id) {
    return await Accessory.findById(id).lean()
}
async function getAllOfCube(id) {
    let all = await Cube.find({ _id: id }, 'accessories').lean()
    let allAccessories = all[0].accessories
    for (const id of allAccessories) {
        let i = allAccessories.indexOf(id)
        allAccessories[i] = await getOne(id)

    }
    return allAccessories
}

async function getAllWithoutOwned(ids) {
    return Accessory.find({_id: {$nin: ids}}).lean()
}
module.exports = {
    getAllWithoutOwned,
    createAccessory,
    getAll,
    addAccessory,
    getAllOfCube,
    getOne,


}