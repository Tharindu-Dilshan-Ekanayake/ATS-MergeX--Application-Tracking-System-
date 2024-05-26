const express = require('express');
const router = express.Router();
const cors = require('cors');
const { updatestatus, getstatus } = require('../controllers/statusController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

//route
router.post('/update',updatestatus);
router.get('/getstatus',getstatus)



module.exports = router;