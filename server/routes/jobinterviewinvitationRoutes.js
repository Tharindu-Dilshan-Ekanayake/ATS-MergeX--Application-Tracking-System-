const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getinvitationsendisfalse, getinvitationsendistrue, updateSend } = require('../controllers/jobinterviewinvitationController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.get('/sendinvitation', getinvitationsendisfalse);
router.get('/sentinvitation', getinvitationsendistrue);
router.put('/send/:id',updateSend)

module.exports = router;