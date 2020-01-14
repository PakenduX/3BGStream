const express = require('express');
const router = express.Router();
let User = require('../models/User')
const auth = require('../security/Authentication')
const searchYoutube = require('youtube-api-v3-search')
const config = require('../security/Config')
const fs = require('fs');
const ytdl = require('ytdl-core');
const Video = require('../models/Video')

/**
 * User routes (register, auth ...)
 * @author Mama
 * @date oct 25th 2019
 */

router.post('/search', async(req, res) => {
    const options = {
        q: req.body.query,
        part:'snippet',
        type:'video',
        maxResults: 30
    }

    let result = await searchYoutube(config.YOUTUBE_API_KEY, options)
    return res.json(result)

});

router.post('/save', async (req, res) => {
    const { userId, videoId, playListId } = req.body
    const path = 'uploads/' + userId + '-' + videoId + '-' + 'video.flv'

    const video = new Video({
        videoId: videoId,
        storage_url: config.SERVER_ADDRESS + '/' + userId + '-' + videoId + '-' + 'video.flv',
        playListId: playListId,
        userId: userId
    })

    const connection = ''
    const collection = connection.collection('videos')

    ytdl(`${config.youtube_core_url}=${videoId}`)
        .pipe(
            fs.createWriteStream(path)
                .on('finish', () => {
                    collection.insert(video)
                        .then(result => {
                            if(result.result.ok === 1){
                                return res.json({
                                    status: 'success',
                                    message: 'Video stored successfully'
                                })
                            } else {
                                return res.json({
                                    status: 'error',
                                    message: 'Error while storing video'
                                })
                            }
                        })
                        .catch(error => {
                            return res.json({
                                status: 'error',
                                message: 'Error server while storing video'
                            })
                        })
                })
        )

})

module.exports = router;
