
var mailer = require('./mailer'),
    Cache = require('./cache'),
    cached = new Cache(['header','footer','index','about','error','success','software'], __dirname + '/app'),
    contact, about, software, error, success;



    
contact = function (req, res) {
    var name = req.body.name, 
        email = req.body.email,
        phone = req.body.phone || 'Not specified',
        bugdet = req.body.bugdet || 'Not specified',
        message = req.body.message;
    
    if (name && email && message) {
        mailer({
            from: name + '<' + email + '>',
            body: '<p>Phone: ' + phone + '</p><p>Bugdet: ' + bugdet + '</p><br><p>' + message + '</p>'
        }, function (error, response) {
            if (error) {
                console.log('Nodemailer could not send Mail');
                res.redirect('/error');
            }
            else {
                res.redirect('/success');
            }
        });
    }
    else {
        res.redirect('/error');
    }
};


about = function (req, res) {
    var page = cached.renderPage('about');

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    
    res.end(page);
};




software = function (req, res) {
    var page = cached.renderPage('software');
    
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    
    res.end(page);
};




success = function (req, res) {
    var page = cached.renderPage('success');
    
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    
    res.end(page);
};




error = function (req, res) {
    var page = cached.renderPage('error');
    
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    
    res.end(page);
};


blog = function (req, res) {
    var page = cached.renderPage('error');
    
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    
    res.end(page);
};


module.exports.contact = contact;
module.exports.about = about;
module.exports.software = software;
module.exports.error = error;
module.exports.success = success;

