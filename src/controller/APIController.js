import pool from "../configs/connecDB"

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `Users`')

    return res.status(200).json({
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    if (!lastName || !firstName || !email || !address) {
        return res.status(200).json({
            message: 'ok'
        })
    }
    await pool.execute('INSERT INTO Users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, address]
    );
    return res.status(200).json({
        message: 'okla'
    })
}

let updateUsernew = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;

    if (!lastName || !firstName || !email || !address ||!id) {
        return res.status(200).json({
            message: 'ok'
        })
    }
    await pool.execute(
        `update Users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`
        , [firstName, lastName, email, address, id])
    return res.status(200).json({
        message: 'okla'
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id
    if(!userId){
        return res.status(200).json({
            message: 'khong chuyen id'
        })
    }
    await pool.execute('delete from Users where id = ?', [userId])
    return res.status(200).json({
        message: 'oklalll'
    })
}
module.exports = {
    getAllUsers,
    createNewUser,
    updateUsernew,
    deleteUser
}