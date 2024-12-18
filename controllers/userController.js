const db = require('../models')

// create main Model
const User = db.users

// Get User
const getUser = async (req, res) => {
    let users = await User.findAll({
        // attributes: [
        //     'name',
        //     'age',
        //     'address'
        // ]
    })
    res.send(users)
}

// Get One User
// const getOneUser = async (req, res) => {
//     let id = req.params.id
//     let user = await User.findOne({ where: { id: id }})
//     res.status(200).send(user)
// }

// Adding User
const addUser = async (req, res) => {
    let userInfo = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        isActive: req.body.isActive ? req.body.isActive : false
    }
    const user = await User.create(userInfo)
    res.status(200).send(user)
}

// Edit User
const editUser = async (req, res) => {
    let id = req.params.id
    const user = await User.update(req.body, {  where: { id: id }})
    res.status(200).send(user)
}

// Delete User 
const deleteUser = async (req, res) => {
    let id = req.params.id
    await User.destroy({ where: { id: id }})
    res.status(200).send('User Deleted!')
}

module.exports = {
    getUser,
    addUser,
    editUser,
    deleteUser,
}