const {validationResult, check} = require("express-validator")
const express = require('express');
const router = express.Router();
let User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../security/Config')
const auth = require('../security/Authentication')

/**
 * User routes (register, auth ...)
 * @author Mama
 * @date oct 25th 2019
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

        user.save()
            .then(res => {
                console.log(res)
                return res.json({
                    status: 'osef',
                    message: res
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
});

/*router.post('/login', function (req, res, next) {
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
                Model.User.findOne({
                    where: {
                        phone: user.phone,
                    }
                }).then(userr => {
                    const token = jwt.sign({ id: userr.phone }, jwtConfig.secret);
                    res.status(200).json({
                        auth: true,
                        token: token,
                        message: 'connexion réussie',
                        user: userr
                    });
                });
            });
        }
    })(req, res, next);
});

router.post('/checkExistenceByPhone', (req, res) => {
    Model.User.findOne({
        where: {
            phone: req.body.phone
        }
    })
        .then(user => {
            if(!user){
                return res.json({
                    status: 'error',
                    message: 'Cet utilisateur n\'existe pas'
                })
            } else {
                return res.json({
                    status: 'success',
                    message: 'Cet utilisateur existe'
                })
            }
        })
        .catch(error => {
            return res.json({
                status: 'error',
                message: 'Une erreur s\'est produite'
            })
        })
})

router.post('/checkExistenceByEmail', (req, res) => {
    Model.User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if(!user){
                return res.json({
                    status: 'error',
                    message: 'Cet utilisateur n\'existe pas'
                })
            } else {
                return res.json({
                    status: 'success',
                    message: 'Cet utilisateur existe'
                })
            }
        })
        .catch(error => {
            return res.json({
                status: 'error',
                message: 'Une erreur s\'est produite'
            })
        })
})

router.post('/getUser', (req, res) => {
    let finalUser;
    req.body.status === 'professionnel' ?
        finalUser = Model.Professionnel :
        finalUser = Model.Particulier
    finalUser.findOne({
        where: {
            phone: req.body.phone
        }
    })
        .then(fu => {
            if(!fu){
                return res.json({
                    status: 'error',
                    message: 'Cet utilisateur n\'existe pas'
                })
            } else {
                return res.json(fu)
            }
        })
        .catch(error => {
            return res.json({
                status: 'error',
                message: 'Problème pendant la récupération de l\'utilisateur'
            })
        })

})

router.put('/updateToken', [auth], (req, res) => {
    let user;
    req.body.status === 'particulier' ?
        user = Model.Particulier :
        user = Model.Professionnel

    if(req.body.pushToken !== undefined) {
        user.update(
            {pushToken: req.body.pushToken},
            {
                where: {phone: req.body.phone}
            }).then(response => {
            if (response[0] === 1) {
                return res.json({
                    status: 'success',
                    message: 'Le token a été bien mis à jour'
                })
            } else {
                return res.json({
                    status: 'error',
                    message: 'Problème pendant la mise à jour du token'
                })
            }
        }).catch(error => {
            console.log(error)
            return res.json({
                status: 'error',
                message: 'Problème pendant la mise à jour du token'
            })
        })
    }
})

router.put('/updateUser/:id', [auth], (req, res) => {
    let update
    let user
    const id = req.params.id
    req.body.status === 'particulier' ?
        user = Model.Particulier :
        user = Model.Professionnel
console.log(id + ' ' + req.body.status)
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
