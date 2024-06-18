const Addwishlistmodel = require('../models/addWishlist');

// POST endpoint to add a new wishlist item
const postwishlist = async (req, res) => {
    try {
        const {
            job_invitation_id,
            job_id,
            candidate_id,
            candidate_email
        } = req.body;

        // Create a new wishlist item
        const newWishlistItem = new Addwishlistmodel({
            job_invitation_id,
            job_id,
            candidate_id,
            candidate_email
        });

        // Save the wishlist item to the database
        const savedWishlistItem = await newWishlistItem.save();

        // Send a success response
        res.status(201).json({
            message: 'Wishlist item added successfully',
            data: savedWishlistItem
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: 'An error occurred while adding the wishlist item',
            error: error.message
        });
    }
};

// GET endpoint to get all wishlist items
const getdetails = async (req, res) => {
    try {
        // Fetch all wishlist items from the database
        const wishlistItems = await Addwishlistmodel.find();

        // Send the response with the wishlist items
        res.status(200).json({
            message: 'Successfully retrieved wishlist items',
            data: wishlistItems
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: 'An error occurred while retrieving wishlist items',
            error: error.message
        });
    }
};

//get submitted false
const getdetailssubmittedfalse = async (req, res) => {
    try {
        const items = await Addwishlistmodel.find({ submitted: false }).sort({ createdAt: -1 });

        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No wishlist items found" });
        }

        // Return the array of wishlist items
        return res.status(200).json({
            message: "Successfully retrieved wishlist items",
            data: items
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

//get submitted true
const getdetailssubmittedtrue = async (req, res) => {
    try {
        const items = await Addwishlistmodel.find({ submitted: true }).sort({ createdAt: -1 });

        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No wishlist items found" });
        }

        // Return the array of wishlist items
        return res.status(200).json({
            message: "Successfully retrieved wishlist items",
            data: items
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    postwishlist,
    getdetails,
    getdetailssubmittedfalse,
    getdetailssubmittedtrue
};
