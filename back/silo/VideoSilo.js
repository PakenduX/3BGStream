const express = require('express');
const router = express.Router();
const auth = require('../security/Authentication')
const searchYoutube = require('youtube-api-v3-search')
const config = require('../security/Config')
const fs = require('fs');
const ytdl = require('ytdl-core');
const {getVideo} = require("../models/dbConnection");

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
        maxResults: 25
    };

    let result = await searchYoutube(config.YOUTUBE_API_KEY, options)
    return res.json(result)

});

router.post('/save', async (req, res) => {
    const { userId, videoId, playListId, thumbnail, description, title } = req.body;
    const path = 'uploads/' + userId + '-' + videoId + '-' + 'video.flv';
    const Video = getVideo(global['dbConnection']);

    Video.findOne({
        videoId: videoId
    })
        .then(v => {
            if(v){
                return res.json({
                    status: 'error',
                    message: 'This video is already in this playlist'
                });
            } else {
                const video = new Video({
                    videoId: videoId,
                    storage_url: config.SERVER_ADDRESS + '/' + userId + '-' + videoId + '-' + 'video.flv',
                    playListId: playListId,
                    userId: userId,
                    thumbnail: thumbnail,
                    description: description,
                    title: title
                });

                video.save()
                    .then(result => {
                        console.log(result)
                        if(result){
                            res.json({
                                status: 'success',
                                message: 'Video stored successfully'
                            });
                            ytdl(`${config.youtube_core_url}=${videoId}`)
                                .pipe(
                                    fs.createWriteStream(path)
                                        .on('finish', () => {
                                            console.log('finished')
                                        })
                                )
                        } else {
                            return res.json({
                                status: 'error',
                                message: 'Error while storing video'
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        return res.json({
                            status: 'error',
                            message: 'Error server while storing video'
                        })
                    })
            }
        })

});

router.get('/all/:plId', async(req, res) => {

    const Video = getVideo(global['dbConnection']);
    Video.find({
        playListId: req.params.plId
    })
        .then(videos => {
            return res.json(videos)
        })
        .catch(error => {
            console.log(error)
            return res.json({
                status: 'error',
                message: 'Error server while fetching your videos'
            })
        });

});

module.exports = router;
