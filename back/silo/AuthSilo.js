const {validationResult, check} = require("express-validator")
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../security/Config')
const { getUser } = require('../models/dbConnection')
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
        .isLength({min: 2})
        .withMessage('Le nom doit contenir au moins 2 caractères'),
    check('prenom')
        .isAlpha()
        .withMessage('Le prenom ne doit contenir que des lettres')
        .isLength({min: 2})
        .withMessage('Le prénom doit contenir au moins 2 caractères'),
    check('password')
        .isLength({min: 8})
        .withMessage('Le mot de passe doit contenir au moins 8 caractères'),

], async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.json({ errors: errors.array() });
    } else {
        const password = bcrypt.hashSync(req.body.password, 10)
        const User = getUser(global['dbConnection']);

        let user = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: password
        })

        user
            .save()
            .then(result => {
                if(result){
                    return res.json({
                        status: 'success',
                        message: 'User created successfully'
                    })
                } else {
                    return res.json({
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

router.post('/login', (req, res, next) => {
    passport.authenticate('login', {session: false}, async (err, user, info) => {
        if (err) {
            return res.json({
                status: 'error',
                message: err
            });
        }
        if (info !== undefined) {
            return res.json({
                status: 'error',
                message: info.message
            });
        } else {
            const User = getUser(global['dbConnection']);

            req.logIn(user, err => {
                User.findOne({
                    email: user.email,
                }).then(userr => {
                    const token = jwt.sign({ id: userr.email }, jwtConfig.secret);
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
