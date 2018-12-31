//var http = require('http');
//var dispatcher = require('./httpdispatcher.js');
var fs = require('fs');
var youtubedl = require('youtube-dl');
//var path = require('path');
var express = require('express');

var server = express();

server.post('/youtube', (req, res) => {
    let body = '';
    
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        
        var video = youtubedl(body, ['--format=18'], { cwd: __dirname });

        var namefile = '';

        video.on('info', function(info){
            console.log('Download started');
            console.log('filename: ' + info._filename);
            console.log('size: ' + info.size);
            namefile = info._filename;
            video.pipe(fs.createWriteStream('Video/' + info._filename + '.mp4'));
        });

        //var namefile = generateRandomString(6);

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

/*
dispatcher.onPost('/youtube', function(req, res){
    
    let body = '';
    
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        
        var video = youtubedl(body, ['--format=18'],{ cwd: __dirname });

        video.on('info', function(info){
            console.log('Download started');
            console.log('filename: ' + info.filename);
            console.log('size: ' + info.size);
        });

        var namefile = generateRandomString(6);

        video.pipe(fs.createWriteStream('/home/stefano/Scrivania/MYS/ServTorrent/Video/' + namefile + '.mp4'));

        video.on('complete', (info) => {
            'use strict';
            console.log('filename: ' + info._filename + ' already downloaded.');
        });
           
        video.on('end', () => {
            console.log('finished downloading!');
            
            res.writeHead(200, {'Content-Type': 'video/mp4' });
            fs.createReadStream('/home/stefano/Scrivania/MYS/Video/' + namefile + '.mp4').pipe(res);
            res.download('/home/stefano/Scrivania/MYS/Video/' + namefile + '.mp4');
            
            var filePath = path.join(__dirname, '/Video/' + namefile + '.mp4');
            console.log(filePath);
            var stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'video/mp4',
                'Content-Length': stat.size,
                'Content-Disposition': 'attachment; filename=' + namefile
            });
            
            var file = fs.readFile(filePath, 'binary');
            console.log(file);
            res.write(file.toString(), 'binary');
            res.end();
            
        });
    
    });

});
*/

/*
http.createServer(function(req, res){
    dispatcher.dispatch(req, res);
}).listen(1337, '127.0.0.1');

console.log('finished downloading');
*/
