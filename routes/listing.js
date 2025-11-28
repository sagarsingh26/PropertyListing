const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");

const upload = multer({ storage });



//router route is used to format nicely the routes which have a bit common bath
//common path here /

router
.route("/")
.get( wrapAsync(listingController.index))
.post(
      isLoggedIn,
      validateListing, 
      upload.single('listing[image]') , 
      wrapAsync(listingController.createListing)
     );
 





//New Route
router.get("/new" , isLoggedIn, listingController.renderNewForm);






//common path here /:id
router
.route("/:id")
.get( wrapAsync(listingController.showListing)) //show route
.put(
      isLoggedIn , 
      isOwner, 
      upload.single("listing[image]"),
      validateListing, 
      wrapAsync(listingController.UpdateListing))//update route
.delete( isLoggedIn, isOwner, wrapAsync(listingController.DestroyListing)); //delete route





 

//Edit Route

router.get("/:id/edit" ,isLoggedIn, isOwner,
     wrapAsync(listingController.renderEditForm));







module.exports = router;






































