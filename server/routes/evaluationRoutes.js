const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
    createEvalautions, 
    //  updateEvaluation,
      getEvaluation,getimg,getpost,getEvaCandidates,getNotEvaluatedApplications,updateIsEvaluated,getEvaluatedApplications,getRecruitercheckedEvaluations,getRecruiterUnCheckedEvaluations,getHMcheckedEvaluations,getHMUnCheckedEvaluations,updatecheckedrecruiter,updatecheckedhiringmanager,getcandidateforfinaldecision,gethiredCandidtaesList,getrejectedList,approvedjobPosting,getHMcheckedEvaluationsById,getHMUncheckedEvaluationsById,getRecruitercheckedEvaluationsbyID,getRecruiterUnCheckedEvaluationsbyID,getcheckedevaluationsbyjobID} = require('../controllers/evaluationController');

router.use(
    cors({
        credentials:true,
        origin: 'http://localhost:3000'
    })
);

router.post('/createevaluation',createEvalautions);
// router.put('/updateevaluation/:_id',updateEvaluation);
router.get('/',getEvaluation);
router.get('/getimg/:_id',getimg);
router.get('/getpost/:_id',getpost);
router.get('/getEvaCandidates',getEvaCandidates);
router.get('/getNotEvaluatedApplications',getNotEvaluatedApplications);
router.put('/updateIsEvaluated/:_id',updateIsEvaluated);
router.get('/getEvaluatedApplications',getEvaluatedApplications);
router.get('/getRecruitercheckedEvaluations',getRecruitercheckedEvaluations);
router.get('/getRecruiterUnCheckedEvaluations',getRecruiterUnCheckedEvaluations);
router.get('/getHMcheckedEvaluations',getHMcheckedEvaluations);
router.get('/getHMUnCheckedEvaluations',getHMUnCheckedEvaluations);
router.put('/updatecheckedrecruiter/:_id',updatecheckedrecruiter);
router.put('/updatecheckedhiringmanager/:_id',updatecheckedhiringmanager);
router.get('/getcandidateforfinaldecision',getcandidateforfinaldecision);
router.get('/gethiredCandidtaesList',gethiredCandidtaesList);
router.get('/getrejectedList',getrejectedList);
router.get('/approvedjobPosting',approvedjobPosting);
router.get('/getHMcheckedEvaluationsById/:job_id',getHMcheckedEvaluationsById);
router.get('/getHMUncheckedEvaluationsById/:job_id',getHMUncheckedEvaluationsById);
router.get('/getRecruitercheckedEvaluationsbyID/:job_id',getRecruitercheckedEvaluationsbyID);
router.get('/getRecruiterUnCheckedEvaluationsbyID/:job_id',getRecruiterUnCheckedEvaluationsbyID);
router.get('/getcheckedevaluationsbyjobID/:job_id',getcheckedevaluationsbyjobID);



module.exports = router;