const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const keys = require("../../config/keys");

const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");

const User = require("../../models/User");


router.post("/register", (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).send({
                    message: "Email for user already exists"
                })
            } else {
<<<<<<< Updated upstream
            let newUser = new User({
                name : req.body.name,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password)
            })
=======
                let newUser = new User({
                    userType: req.body.userType,
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password),

                })
>>>>>>> Stashed changes

                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            }

        })
})

router.post("/login", (req, res) => {

    let { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.status(404).send({
                    message: "User not found"
                })
            }

            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        _id: user.id,
                        name: user.name,
                        userType: user.userType,
                        associations: user.associations,
                    }

                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: '2d'
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        }
                    );
                }
                else {
                    return res.status(400).json({ passwordIncorrect: "Password incorrect" });
                }
            })


        })
})

router.put("/addconnection/:id", (req, res) => {

    // console.log(req.body.associations[req.body.associations.length - 1]);

    User.findById(req.body.associations[req.body.associations.length - 1])
        .exec((err, user) => {
            let s = user;
            if (!user) {
                res.status(404).json({ message: 'No user found' })
            } else if (err) {
                res.status(500).json({ message: `There was an error: ${err}` })
            } else if (user.userType === 'Student') {
                User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, user1) => {
                    if (err) {
                        res.status(404).json({ message: "That student does not exist. " })
                    } else {
                        res.json(user1);
                    }
                })
            } else {
                res.status(404).json({ message: 'No user found' });
            }
        })



    // User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, user1) => {
    //     if (err) {
    //         res.status(404).json({ message: "That student does not exist. " })
    //     } else {
    //         res.json(user1);
    //     }
    // })

})

router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .exec((err, user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found' })
            } else if (err) {
                res.status(500).json({ message: `There was an error: ${err}` })
            } else {
                res.status(200).json(user);
            }
        })
})

router.get("/", (req, res) => {
    User.find()
        .exec((err, users) => {
            if (err) {
                res.status(500).json({ message: `Error with database: ${err} ` })
            } else if (users.length === 0) {
                res.status(404).json({ message: "No users found" })
            } else {
                res.status(200).json(users);
            }
        })
})

router.get("/:id/funders", (req, res) => {
   
    const studentId = req.params.id;
    User.find( { associations: { $all: [studentId] } })
        .exec((err, users) => {
            if(err){
                res.status(500).json({ message: `Error ` })
            } else if (users.length === 0){
                res.status(404).json({message: 'no users found'})
            } else {
                res.status(200).json(users);
            }
        })
} )

module.exports = router;

