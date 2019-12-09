const {validationResult, check} = require("express-validator")
const express = require('express');
const router = express.Router();
let User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../security/jwtConfig')
const auth = require('../security/Authentication')
const UserDB = require('../models/userDBConnect')

const connection = new UserDB().getConnection()
const collection = connection.collection('users')

/**
 * User routes (register, auth ...)
 * @author 3BGTeam
 * @date 9th december 2019
 */

router.post('/register', [
    check('email')
        .isEmail()
        .withMessage('Entrez une adresse email valide'),
    check('nom')
        .isAlpha()
        .withMessage('Le nom ne doit contenir que des lettres')
        .isLength({min: 3})
        .withMessage('Le nom doit contenir au moins 3 caractères'),
    check('prenom')
        .isAlpha()
        .withMessage('Le prenom ne doit contenir que des lettres')
        .isLength({min: 3})
        .withMessage('Le prénom doit contenir au moins 3 caractères'),
    check('password')
        .isLength({min: 6})
        .withMessage('Le mot de passe doit contenir au moins 6 caractères'),

], (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.json({ errors: errors.array() });
    } else {

        const password = bcrypt.hashSync(req.body.password, 10)

        let user = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: password
        })

        collection.insert(user)
            .then(result => {
                if(result.result.ok === 1){
                    res.json({
                        status: 'success',
                        message: 'User created successfully'
                    })
                } else {
                    res.json({
                        status: 'error',
                        message: 'Error while creating user'
                    })
                }
            })
            .catch(error => {
                res.json({
                    status: 'error',
                    message: 'Error server while creating user'
                })
            })
    }
});

router.post('/login', function (req, res, next) {
    passport.authenticate('login', {session: false}, (err, user, info) => {
        if (err) {
            res.json({
                status: 'error',
                message: err
            });
        }
        if (info !== undefined) {
            res.json({
                status: 'error',
                message: info.message
            });
        } else {
            req.logIn(user, err => {
                User.findOne({
                    email: user.email,
                }).then(userr => {
                    const token = jwt.sign({ id: userr.phone }, jwtConfig.secret);
                    res.status(200).json({
                        auth: true,
                        token: token,
                        message: 'connected successfully',
                        user: userr
                    });
                });
            });
        }
    })(req, res, next);
});




/*router.put('/updateUser/:id', [auth], (req, res) => {
    let update
    let user
    const id = req.params.id
    req.body.status === 'particulier' ?
        user = Model.Particulier :
        user = Model.Professionnel
    if(req.body.email !== undefined){
        update = {email: req.body.email}
    } else if(req.body.phone !== undefined){
        update = {phone: req.body.phone}
    } else if(req.body.nom !== undefined){
        update = {nom: req.body.nom}
    } else if(req.body.prenom !== undefined){
        update = {prenom: req.body.prenom}
    } else if(req.body.password !== undefined){
        update = {
            password: bcrypt.hashSync(req.body.password, 10),
            passwordModifDate: new Date()
        }
    }

    user.update(update, {where: {id: id}})
        .then(response => {
            console.log(response)
            if(response[0] === 1) {
                user.findOne({
                    where: {
                        id: id
                    }
                })
                    .then(backUser => {
                        return res.json({
                            status: 'success',
                            message: 'Mise à jour effectuée avec succès',
                            user: backUser
                        })
                    })
                    .catch(error => {
                        return res.json({
                            status: 'error',
                            message: 'Problème serveur pendant la mise à jour'
                        })
                    })
            } else {
                return res.json({
                    status: 'error',
                    message: 'Problème pendant la mise à jour'
                })
            }
    }).catch(error => {
        console.log(error)
        return res.json({
            status: 'error',
            message: 'Problème serveur pendant la mise à jour'
        })
    })
})*/

module.exports = router;
