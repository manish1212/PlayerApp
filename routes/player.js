const fs = require('fs');

module.exports = {
    addProductPage: (req, res) => {
        res.render('addProduct.ejs', {
            title: "Add products",
            message: ''
        });
    },
    addProduct: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let title = req.body.title;
        let description = req.body.description;
        let price = req.body.price;
        let location = req.body.location;
        let categoryName = req.body.categoryName;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = "img-"+ Date.now() + '.' + fileExtension;

        


        if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            // upload the file to the /public/assets/img directory
            uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                if (err) {
                    return res.status(500).send(err);
                }
                // send the player's details to the database
                var image  = image_name;
                let query = "INSERT INTO `Products` (title, description, price, location, categoryName, image) VALUES ('" +
                    title + "', '" + description + "', '" + price + "', '" + location + "', '"  + categoryName + "', '" + image +  "')";
                    console.log("categry Name", categoryName);
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        } else {
            message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
            res.render('addProduct.ejs', {
                message,
                title: "Add a new Product"
            });
        }
    },
    editProductPage: (req, res) => {
        console.log("product Id ", req.body);
        let productId = req.params.id;
        let query = "SELECT * FROM `Products` WHERE productId = '" + productId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('editProduct.ejs', {
                title: "Edit  Product"
                ,product: result[0]
                ,message: ''
            });
        });
    },
    editProduct: (req, res) => {
        let productId = req.body.productId;
        let title = req.body.title;
        let description = req.body.description;
        let price = req.body.price;
        let location = req.body.location;
        let categoryName = req.body.categoryName;
        // let uploadedFile = req.files.image;
        // let image_name = uploadedFile.name;
        // let fileExtension = uploadedFile.mimetype.split('/')[1];
        // image_name = "img-"+ Date.now() + '.' + fileExtension;

        let query = "UPDATE `Products` SET `title` = '" + title + "', `description` = '" + description + "', `price` = '" + price + "', `location` = '" + location + "', `categoryName` = '" + categoryName + "' WHERE `Products`.`productId` = '" + productId + "'";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteProduct: (req, res) => {
        let productId = req.params.id;
        let getImageQuery = 'SELECT image from `Products` WHERE productId = "' + productId + '"';
        let deleteUserQuery = 'DELETE FROM Products WHERE productId = "' + productId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};