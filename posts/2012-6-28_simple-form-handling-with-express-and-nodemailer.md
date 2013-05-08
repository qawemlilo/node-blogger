In my last Node.js post I created a simple website for my projects, creating static pages is a breeze once you understand how Express works. However, your traditional website is not really complete without a 'contact us' page, today I will write about creating a contact form for my website.

Node.js is minimalistic by design and does not offer native support for sending emails, for this purpose I have chosen Nodemailer - an easy to use module to send e-mails with Node.JS.

### The view
A new view is required to display our contact page therefore I created a file in the views directory and named it `contact.jade`.

### views/contact.js
    h1 Contact Form
    div.content
      form(action='/contact', name='contactus', id='contactus', method='post')
        fieldset
          p
            label(for='name') Name:
            br
            input(name='name', type='text', value='', id='name')
          p
            label(for='email') Email:
            br
            input(name='email', type='text', value='', id='email')
          p
            label(for='message') Message:
            br
            textarea(name='message', cols='40', rows='10', id='message')
          p
            input(name='submit', type='submit', value='Send', id='submit')
            
After the form view is created we need to create a route that will handle a `/contact` GET request and load the view. Two files need to be edited, app.js and `routes/index.js`.

### app.js
    app.get('/contact', routes.contact);
    
### routes/index.js
    exports.contact = function(req, res){
        res.render('contact', { title: 'Raging Flame Laboratory - Contact', page: 'contact' })
    };
    
At this point our contact page is working beautifully but  cannot do much because it can't handle any data.

### Handling form data
I really love express for its ease to use and the amount of goodness it comes with, in our `app.js` file we need to include the `bodyParser()` middleware, this will ensure that form variables are stored in the request object.

Next we need to install Nodemailer.

    npm install nodemailer
    
Let us edit app.js and include this module.

### app.js
    var nodemailer = require('nodemailer');
    
Nodemailer has several options for sending emails, you can find out more on the [github page](http://github.com/andris9/Nodemailer), I chose to use the Gmail option. Let's handle the `/contact` post request:

    app.post('/contact', function (req, res) {
      var mailOpts, smtpTrans;
 
 
      //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
      smtpTrans = nodemailer.createTransport('SMTP', {
          service: 'Gmail',
          auth: {
              user: "me@gmail.com",
              pass: "application-specific-password" 
          }
      });
 
 
      //Mail options
      mailOpts = {
          from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
          to: 'me@gmail.com',
          subject: 'Website contact form',
          text: req.body.message
      };
 
 
      smtpTrans.sendMail(mailOpts, function (error, response) {
          //Email not sent
          if (error) {
              res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
          }
          //Yay!! Email sent
          else {
              res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
          }
      });
    });
    
I had problems initially connecting to Gmail because my Gmail account uses a 2-factor authentication but that was easy to solve, simply create an [application-specific password](https://accounts.google.com/IssuedAuthSubTokens).

Lastly, we need to give some kind of feedback to the user.

### views/contact.jade
    if(typeof msg !== 'undefined')
      if(!!err)
        div(class='msgbox err') #{msg}
      else
        div(class='msgbox success') #{msg}
        
That's all folks, my contact page is now fully functional. Please add basic sanitization and form validation if you are going to create a similar form.

