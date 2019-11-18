module.exports = {
    // getHomePage: (req, res) => {
    //     let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

    //     // execute query
    //     db.query(query, (err, result) => {
    //         if (err) {
    //             res.redirect('/');
    //         }
    //         res.render('index.ejs', {
    //             title: "Welcome to Socka | View Players",
    //             players: result
    //         });
    //     });
    // },
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `Products` ORDER BY productId ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('home.ejs', {
                title: "Welcome to SFSU | View Proucts",
                products: result
            });
        });
    },
    searchProducts: (req, res) => {
        searchString = req.body.search;
        categoryString = req.body.categoryName;
        console.log("--->",searchString, categoryString);
        // let query = "SELECT * FROM `Products` ORDER BY productId ASC"; // query database to get all the players

        if( searchString != undefined &&  categoryString != undefined ){
            var query = "SELECT * FROM Products WHERE title LIKE '%" +searchString+ "' AND categoryName LIKE '%" +categoryString+ "';"
        }else if(searchString == undefined){

            var query = "SELECT * FROM Products WHERE title LIKE '%" +searchString+ "';"

        }else if(categoryString == undefined){

            var query = "SELECT * FROM Products WHERE title LIKE '%" +searchString+ "';"
        }else{

            var query = "SELECT * FROM Products"
        }
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to SFSU | View Proucts",
                products: result
            });
        });
    },
};