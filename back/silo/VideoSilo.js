const express = require('express');
const router = express.Router();
let User = require('../models/User')
const auth = require('../security/Authentication')
const searchYoutube = require('youtube-api-v3-search')
const config = require('../security/Config')

/**
 * User routes (register, auth ...)
 * @author Mama
 * @date oct 25th 2019
 */

router.post('/search', async(req, res) => {
    const options = {
        q: req.body.query,
        part:'snippet',
        type:'video'
    }

    let result = await searchYoutube(config.YOUTUBE_API_KEY, options)
    return res.json(result)

});

module.exports = router;
