const express = require('express');
const router = express.Router();
const auth = require('../security/Authentication');
const { getPlayList } = require('../models/dbConnection')
/**
 * Video playlist silo
 * @author 3BGSTeam
 * @date dec 16th 2019
 */

router.post('/create', async (req, res) => {
    const PL = getPlayList(global['dbConnection']);

    let pl = new PL({
        nom: req.body.nom,
        date: new Date(),
        userId: req.body.userId
    })


    pl
        .save()
        .then(result => {
            if(result){
                return res.json({
                    status: 'success',
                    message: 'Playlist created successfully'
                })
            } else {
                console.log('icicici')
                return res.json({
                    status: 'error',
                    message: 'Error while creating your playlist'
                })
            }
        })
        .catch(error => {
            console.log(error)
            return res.json({
                status: 'error',
                message: 'Error server while creating your playlist'
            })
        })
})

router.get('/all/:userId', async (req, res) => {
    const userId = req.params.userId
    const PL = getPlayList(global['dbConnection'])

    PL.find({
        userId: userId
    })
        .then(pls => {
            return res.json(pls)
        })
        .catch(error => {
            console.log(error)
            return res.json({
                status: 'error',
                message: 'Error server while fetching your playlists'
            })
        })
})

module.exports = router;
