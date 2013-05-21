
/*
   Program for generating a sitemap
*/
var XML = require('xml'),
    fs = require('fs');


function Sitemap () {
    this.header = '<?xml version="1.0" encoding="UTF-8"?>\n';

    this.json = [{
        urlset: [ 
            {_attr: {xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'}}
        ] 
    }];
}




Sitemap.prototype.add = function (post) {
    this.json[0].urlset.push({
        url: [
            {loc: post.url}, 
            {lastmod: new Date(post.lastmod).toISOString().substring(0, 10)}, 
            {changefreq: 'weekly'}  
        ]
    });
}




Sitemap.prototype.create = function () {
    try {
        var map = this.header + XML(this.json, true);
        
        fs.writeFileSync('./template/sitemap.xml', map);
    } catch (error) {
        throw error;
    }
}




module.exports = new Sitemap();



