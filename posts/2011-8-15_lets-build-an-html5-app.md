HTML5 rocks! Today we are going to build a simple JavaScript/HTML5 application that uses the canvas api to convert colour images to black and white. This application includes a php hack that solves the canvas api same origin policy which prevents manipulation of images from a different domain.

### Backend: Our php hack - fetch_image.php

Fetches the image file and loads it as a local resource (Remember to sanitize all input).

    <?php
    if (isset($_GET['url']) && !empty($_GET['url']))
    {
        $url = $_GET['url'];
        $file_format = pathinfo($url, PATHINFO_EXTENSION);
        try
        {
            ob_start();
            header("Content-Type: image/$file_format");
            header("Content-disposition: filename=image.$file_format");
            $img = @file_get_contents($url);
           if ($img)
           echo $img;
           ob_end_flush();
           exit();
        }
        catch(Exception $e)
        {
            echo $e->getMessage();
        }
    }
    else
        die('Unknown request');
    ?>
    
### Front-end: index.html

This is our basic html front-end, we will not worry too much about the css because it is not the focus of this article, however the file will be included in the demo files.

    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>RGB to Grayscale</title>
    <link rel="stylesheet" href="style.css" type="text/css" />
    </head>
    <body>
      <h1>RGB to Grayscale</h1>
      
      <form action="#" method="GET" id="webimage">
        <input name="url" id="url" type="text" placeholder="Enter image url" />
        <input value="Grayscale"  id="submit" name="Submit" type="button">
      </form>
      
      <div id="container">
        <div id="mainloader" class="loader waiting" >
        </div>
        <div id="sideloader" class="loader waiting">
        </div>
      </div>
      
      <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
      <script type="text/javascript" src="app.js"></script>
    </body>
    </html>
    
### Front-end: JavaScript - app.js

Firstly we need some functions to handle the basic tasks for the application.

    //Function for outputting messages
    function showMSG(msg) {
        var elem=$('<div>',{
            id:'errorMessage',
            html:msg
        });
        elem.click(function () {
            $(this).fadeOut(function () {
                $(this).remove();
            });
        });
        setTimeout(function () {
          elem.click();
        }, 5000);
        elem.hide().appendTo('body').slideDown();
    }
    
    //Function for testing if canvas is supported
    function isCanvasSupported() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    //Grayscale algorithm
    function toGreyScale(r, g, b) {
        return r * 0.2989 + g * 0.5870 + b * 0.1140;
    }
    
The next function performs the core task of our application and it takes two parameters - an image object and a div ID. The image object is rendered on canvas and manipulated to black and white.

    function editImage(img, targetDiv) {
        var id = "canvasID",
            canvasContainer = document.getElementById(targetDiv),
            imgCanvas, ctx, imageData, px, len, i, redPx, greenPx, bluePx, greyscale;
        
        //create canvas element and give it attributes
        imgCanvas = document.createElement("canvas");
        imgCanvas.id = id;
        imgCanvas.width = img.width;
        imgCanvas.height = img.height;
    
        //Append canvas to a div inside an html document
        canvasContainer.appendChild(imgCanvas);
    
        //locate the canvas within the html document
        imgCanvas = document.getElementById(id);
        ctx = imgCanvas.getContext("2d");
    
        //Draw the image on the canvas from the top-left(0, 0) corner
        ctx.drawImage(img, 0, 0);
    
        //Access the image data and its pixels
        imageData = ctx.getImageData(0, 0, img.width, img.height);
        px = imageData.data;
        len = px.length; //count pixels
    
        //loop over the pixels and grab RGB values
        for (i = 0; i < len; i += 4) {
            redPx = px[i];
            greenPx = px[i + 1];
            bluePx = px[i + 2];
        
            //convert RGB to grayscale
            greyscale =  toGreyScale(redPx, greenPx, bluePx);
        
            //store the greyscale values
            px[i] = greyscale;
            px[i + 1] = greyscale;
            px[i + 2] = greyscale;
        }
    
        //Clear the canvas
        ctx.clearRect(0, 0, img.width, img.height);
        
        //Draw the new image
        ctx.putImageData(imageData, 0, 0);
    }
    
Lastly we use jQuery to handle interaction with the interface.

    $(function () {
        var canvas_support = isCanvasSupported();
        
        if (!canvas_support) {
            showMSG("Your browser does not support HTML5 Canvas");
            return;
        }
    
        $('#url').focus(function () {
            $(this).val('');
        });
    
        $('#submit').click(function () {
            var img = new Image(), url = $('#url').val(), loader = $('.loader');
        
            $("#mainloader, #sideloader").empty()
              .fadeIn('slow')
              .removeClass('waiting')
              .removeClass('broken')
              .addClass('loading');
            
            $(img).load(function () {
                var $this = this, w = $this.width, h = $this.height;
            
                $("#sideloader").animate({"width": w, "height": h}, 500);
                $('#mainloader').removeClass('loading')
                .animate({"width": w, "height": h}, 500, function () {
                    $('#mainloader').append($this);
                    $($this).fadeIn();
                    
                    setTimeout(function () {
                        $('#sideloader').removeClass('loading');
                        editImage(img, 'sideloader');
                    }, 1000);
                });
            })
            .error(function () {
                $('#mainloader, #sideloader')
                  .removeClass('waiting')
                  .empty()
                  .addClass('broken');
                
                showMSG("Errror in loading image");
            })
            .attr('src', 'fetch_image.php?url=' + url);
        });
    });
    