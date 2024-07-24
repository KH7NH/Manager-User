import pool from "../configs/connecDB"
import multer from "multer"


let getHomepage = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM `Users`')
    return res.render('index.ejs', { dataUser: rows })

}

let getDetailPage = async (req, res) => {
    let id = req.params.userId
    let [user] = await pool.execute('select * from Users where id = ?', [id])
    return res.send(JSON.stringify(user[0]))
}
// read code have try catch
let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    // Replace undefined values with null
    firstName = firstName === undefined ? null : firstName;
    lastName = lastName === undefined ? null : lastName;
    email = email === undefined ? null : email;
    address = address === undefined ? null : address;

    try {
        await pool.execute('INSERT INTO Users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, address]
        );
        return res.redirect('/')
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred");
    }
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId
    await pool.execute('delete from Users where id = ?', [userId])
    return res.redirect('/')
}

let editUser = async (req, res) => {
    let id = req.params.id
    let [user] = await pool.execute('Select * from Users where id = ?', [id])
    return res.render('update.ejs', { dataUser: user[0] })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body
    await pool.execute(
        `update Users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`
        , [firstName, lastName, email, address, id])
    return res.redirect('/')
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.filename}" width="300"><hr /><a href="/upload">Upload another image</a>`)
}

let handleUploadMultipleFiles = async (req, res) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result)
    }

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFiles
}