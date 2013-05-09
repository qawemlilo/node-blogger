I wrote the function below in a recent project, I needed to create unique keys for a small multidimensional array and store it in a session.

    <?php
    function createUniqueId($length = 6, array $db)
    {
        $alph = array("a", "b","c","d","f","g","h","j","k","l","m","n","p","r","s","t","v","w","x","y","z");
        $nums = array(1,2,3,4,5,6,7,8,9);
 
        $id = "";
        srand((double)microtime()*1000000);
        $max = $length/2;
 
        for($i = 1; $i     {
            $id .= $alph[rand(0,20)];
            $id .= $nums[rand(0,8)];
        }
 
        // check if the key already exists
        if (!array_key_exists($id, $db)) {
            return $id;
        }
        else {
            // if it does,lets recurse the function
            createUniqueId($length, $db);
        }
    }
    ?>
