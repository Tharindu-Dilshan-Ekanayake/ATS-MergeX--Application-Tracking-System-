const Announcement = require('../models/announcement');

// announcement post endpoint
const updateannouncement = async (req, res) => {
    try {
        const { user_fname, user_lname, user_email, time, title, announce } = req.body;

        if (!user_fname || !user_lname || !user_email || !time || !title || !announce) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create announcement in the database
        const announcement = await Announcement.create({
            user_fname,
            user_lname,
            user_email,
            time,
            title,
            announce,
        });
        return res.status(200).json({ message: 'Announcement updated successfully', announcement });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// get announcement
const getannouncement = async (req, res) => {
    try {
        // Retrieve all announcements from the database
        const announcements = await Announcement.find();
        return res.status(200).json(announcements);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// delete announcement
const deleteAnnouncement = async (req, res) => {
    const announcementId = req.params.announcementId;
    try {
        const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);

        if (!deletedAnnouncement) {
            return res.status(404).json({ error: 'Announcement not found' });
        }

        return res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        console.error('Error deleting announcement', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    updateannouncement,
    getannouncement,
    deleteAnnouncement
};
