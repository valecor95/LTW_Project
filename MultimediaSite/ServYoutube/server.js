const fs = require('fs');
const youtubedl = require('youtube-dl');
const express = require('express');
const server = express();

//creo un'applicazione express per gestire in modo più semplice il download sul client
//e tramite il modulo youtube-dl scarico il video sfruttando l'API.

server.post('/youtube', (req, res) => {
    let body = '';
    
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        
        let video = youtubedl(body, ['--format=18'], { cwd: __dirname });

        let namefile = '';

        video.on('info', (info) => {
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            namefile = info._filename;
            video.pipe(fs.createWriteStream('Video/' + info._filename + '.mp4'));
        });

        video.on('complete', (info) => {
            'use strict';
            console.log('filename: ' + info._filename + ' already downloaded.');
            res.setHeader('Content-disposition', 'attachment; filename=' + info._filename + '.mp4');
            res.setHeader('Content-type', 'video/mp4');
            res.download('Video/' + info._filename + '.mp4');
        });

        video.on('end', () => {
            console.log('finish downloading');
            res.setHeader('Content-disposition', 'attachment; filename=' + namefile + '.mp4');
            res.setHeader('Content-type', 'video/mp4');
            res.download('Video/' + namefile + '.mp4');
        });
    });
});

server.listen(1337, () => {
    console.log('Server running at http://127.0.0.1:1337/');
});
