Joomla! CMS is my weapon of choice when creating web apps, this means that I get to write a lot of Joomla! extensions. Along the way I have discovered a number of invaluable Classes and methods provided by the Joomla! framework, JRequest is one of them.

When dealing with user input, one of the first and most import things to do is sanitizing it. The JRequest Class provides a number of flexible methods that you can use to clean up request variables, for this post I will use getVar - it accepts a number of options to configure how it behaves.

### Examples

    <?php
    /*
      Fetching a variable from any request method
      Will accept $_GET, $_POST, or $_REQUEST
    */
    $name = JRequest::getVar('name');
 
    /*
      Fetching a variable from a $_GET request method
      Will accept only $_GET request variables
    */
    $name = JRequest::getVar('name', '', 'GET');
 
    /*
      Fetching a variable from a $_POST request method
      Will accept only $_POST request variables
    */
    $name = JRequest::getVar('name', '', 'POST');
    ?>
    
So far I have used 3 arguments when calling the getVar method. The first first argument is the name of the variable that you want to fetch, the second one is the value that you want to assign as a default and the third is the type of request.

The above examples will simply capture any type of data contained in the variable, you can go further and filter the type of data that you expect fetched. There are several data types that getVar accepts:
`INT, INTEGER, FLOAT, DOUBLE, BOOL, BOOLEAN, WORD, ALNUM, CMD, BASE64, STRING, ARRAY, PATH, USERNAME`.

    <?php
    /*
      Filtering only a string data type or a single word from request variables
    */
    $name = JRequest::getVar('name', '', 'GET', 'WORD');
    $name = JRequest::getVar('name', '', 'POST', 'STRING');
 
    /*
      There is also an alternative method to achieving the above
    */
    $name = JRequest::getWord('name', '', 'GET');
    $name = JRequest::getString('name', '', 'POST');
 
    /*
      Filtering only numeric data types from request variables
    */
    $age = JRequest::getVar('age', 0, 'GET', 'INT');
    $age = JRequest::getVar('age', 0, 'POST', 'INTEGER');
    $avarage = JRequest::getVar('age', 0, 'POST', 'DOUBLE');
 
    /*
       Even with numbers you can use an alternative method
    */
    $age = JRequest::getInt('age', 0, 'GET');
    ?>
    
The JRequest Class has really made handling user input less stressful and more secure. Happy coding!

**NOTE:** *JRequest methods are not SQL aware, please use the Joomla Database object to clean up your variables for possible SQL injections*.
