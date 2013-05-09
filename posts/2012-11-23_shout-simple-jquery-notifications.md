I am in the process of building a web app for managing browser bookmarks and I would like to share some of the code. 

Every web app needs some kind of way to give users feedback on performed tasks and actions, so I wrote this little jQuery function(and a few lines of css for formatting).

The reason why I wrote this as a jQuery function is because I needed it to be available from anywhere within the app and not mess with my MVC-like app architecture.

### CSS

    #appMessage {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      height: 25px;
      text-align: center;
      padding: 20px 0px 20px 0px;
      color: #fff;
      background-repeat: no-repeat;
      background-position: 10px center;
      border-bottom: 1px solid;
    }
 
    #appMessage.success {
      color: #4F8A10;
      background-color: #DFF2BF;
    }
 
    #appMessage.error {
      color: #D8000C;
      background-color: #FFBABA;
    }
 
    #appMessage.info {
      color: #00529B;
      background-color: #BDE5F8;
    }
 
    #appMessage.warning {
      color: #9F6000;
      background-color: #FEEFB3;
    }
    
### JavaScript

    /*
    ************************************
    Author: Qawelesizwe Mlilo
    ************************************
    */
 
    (function ($) {
        $.shout = function (message, seconds, msgType) {
 
          /*
           Check if there is a notice currently displayed
           and remove it
          */
 
          if ($("#appMessage").length) {
            $("#appMessage").remove();
          }
 
          /*
             Create a div element
             and default it as an info notice
          */
 
          var elem = $('<div>', {
            'id': 'appMessage',
            'class': msgType || 'info',
            'html': message
          });
 
          /*
             Attach a click event to remove notice
          */
 
          elem.click(function () {
            $(this).fadeOut(function () {
                $(this).remove();
            }.bind(this));
          });
 
          /*
             Close the notice after
             a specified number of seconds
          */
 
          if (seconds) {
            setTimeout(function () {
                elem.click();
            }, seconds * 1000);
          }
 
          /*
             Create a slide down effect
          */
 
          elem.hide().appendTo('body').slideDown();
        };
    }(jQuery));
    
### How to use it

Simply call the function with 2 or 3 arguments

    /*
      Calling it with 2 arguments will default
      to a simple info notice
    */
 
    $.shout('Hello there, this is just a notice', 10);
 
    /*
      Or give an error notice
    */
 
    $.shout('Action failed', 10, 'error');
 
    /*
      Or a success notice
    */
 
    $.shout('Action successfully executed!', 10, 'success');
 
    /*
      A warning notice
    */
 
    $.shout('Are you sure you want to do that?', 10, 'warning');
