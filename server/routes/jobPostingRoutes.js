const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createJobPosting, getAllPendingJobPostings, getAllApprovedJobPostings,getAllRejectedJobPostings,updateJobPosting,deleteJobPosting, updateExpiredStatus ,getNotExpiredJobposting, approveJobPosting,rejectJobPosting } = require('../controllers/jobpostingController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createJobPosting',createJobPosting);
router.get('/getAllPendingJobPostings',getAllPendingJobPostings);
router.get('/getAllApprovedJobPostings',getAllApprovedJobPostings);
router.get('/getAllRejectedJobPostings',getAllRejectedJobPostings);
router.put('/updateJobPosting/:id', updateJobPosting);
router.put('/updateExpiredStatus/:id', updateExpiredStatus);
router.get('/getnotexpiredjobs',getNotExpiredJobposting)
router.delete('/deleteJobPosting/:id', deleteJobPosting);
router.put('/approveJobPosting/:id',approveJobPosting);
router.put('/rejectJobPosting/:id', rejectJobPosting)






module.exports = router;
