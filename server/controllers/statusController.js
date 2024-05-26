const Status = require('../models/status');

const statusset = (req, res) => {
    res.json('test is working');
};

// Function to delete status after 6 hours
const deleteStatus = async (statusId) => {
    try {
        // Find and delete the status
        await Status.findByIdAndDelete(statusId);
        console.log('Status deleted successfully');
    } catch (error) {
        console.error('Error deleting status:', error);
    }
};

// Status post endpoint
const updatestatus = async (req, res) => {
    try {
        const { user_id, user_fname, user_lname, user_email, time, image, description } = req.body;

        if (!user_id || !user_fname || !user_lname || !user_email || !time || !image || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create status in database
        const status = await Status.create({
            user_id,
            user_fname,
            user_lname,
            user_email,
            time,
            image,
            description,
        });

        // Schedule deletion of status after 6 hours
        setTimeout(() => {
            deleteStatus(status._id); // Call deleteStatus function after 6 hours
        }, 6 * 1000 * 10 * 30); // 30mins in milliseconds

        return res.status(200).json({ message: 'Status updated successfully', status });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get status

const getstatus = async (req, res) => {
    try {
        // Retrieve all statuses from the database
        const statuses = await Status.find();
        return res.status(200).json(statuses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    statusset,
    updatestatus,
    getstatus
};
