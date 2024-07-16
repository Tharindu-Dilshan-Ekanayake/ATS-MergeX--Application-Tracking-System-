
const JobPosting = require('../models/jobposting');
const EvaluationModel = require('../models/evaluation');
const InterviewSchedule = require('../models/interviewSchedule');
const User = require('../models/user');

const getEvaluationCount = async (req, res) => {
    try{
        const count = await EvaluationModel.countDocuments({});
        res.status(200).json({total: count});
    }
    catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    }

}

const getTotalJobPostings = async (req, res)=>{
    try{
        const count = await JobPosting.countDocuments({approved:true});
        res.status(200).json({jobpostingcount: count});
    }catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    }
}

const getTotalPendingJobs = async (req, res)=>{
    try{
        const count = await JobPosting.countDocuments({pending:true});
        res.status(200).json({pendingjobpostingcount: count});
    }catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    }
}

const getcandidatecount = async (req,res)=>{
    try{
        const count = await User.countDocuments({role:'candidate'});
        res.status(200).json({candidatecount: count});

    }
    catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    
    }
}

const getTotalVacancies = async (req,res )=>{
    try {
        const result = await JobPosting.aggregate([
          {
            $group: {
              _id: null, // No grouping by any field, we just want the total sum
              totalVacancies: { $sum: "$vacancies" }
            }
          }
        ]);
    
        const totalVacancies = result.length > 0 ? result[0].totalVacancies : 0;
        res.status(200).json({ totalVacancies });
      } catch (error) {
        res.status(500).json({ error: 'Error during aggregation', details: error });
      }
}

const gettodayInterviews = async (req,res)=>{
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    try {
        const count = await InterviewSchedule.countDocuments({
            date: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });

       res.status(200).json({todayInterviews:count});
    } catch (error) {
        res.status(500).json({error:"error in get today interviews count",details:error});
    }
};

const getcandidatedetails = async (req,res)=>{
    try{
        const user = await User.find({role:'candidate'},{_id:0,fname:1,lname:1, email:1 ,phone_number:1,image:1});
        res.status(200).json({candidatedetails: user});
    }
    catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    }

}

const getuserdetails = async (req,res)=>{
    try{
        const user = await User.find({},{_id:0,fname:1,lname:1, email:1 ,phone_number:1,image:1,role:1});
        res.status(200).json({userdetails: user});
    }
    catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    }


}

const getadmincount = async (req,res)=>{
    try{
        const count = await User.countDocuments({role:'admin'});
        res.status(200).json({admincount: count});

    }
    catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    
    }
}

const getrecruitercount = async (req,res)=>{
    try{
        const count = await User.countDocuments({role:'recruiter'});
        res.status(200).json({recruitercount: count});

    }
    catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    
    }

}

const gethiringmanagers = async (req,res)=>{
    try{
        const count = await User.countDocuments({role:'hiring manager'});
        res.status(200).json({hiringmanagercount: count});

    }
    catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    
    }

}

const getinterviewercount = async (req,res)=>{
    try{
         const count = await User.countDocuments({role:'interviewer'});
         res.status(200).json({interviewercount: count});
    }catch(err){
        res.status(500).json({error: 'Error counting documents', details: err});
    }
}

const getinterviewscount = async (req,res)=>{
    try{
        const count = await InterviewSchedule.countDocuments({send : true });
        res.status(200).json({interviewcount: count});

    }catch(err){
        res.status(500).json({error: 'Error counting interviews', details: err});
    
    }
}

const getupcominginterviews = async (req, res) => {
        const now = new Date();
      
        try {
          const count = await InterviewSchedule.countDocuments({
            date: {
              $gte: now
            },
            send: true
          });
      
          res.status(200).json({ upcomingInterviews: count });
        } catch (error) {
          res.status(500).json({ error: 'Error in counting upcoming interviews', details: error });
        }
      };
      


module.exports ={
    getTotalJobPostings,
    getTotalPendingJobs,
    getcandidatecount,
    getTotalVacancies,
    getEvaluationCount,
    gettodayInterviews,
    getcandidatedetails,
    getuserdetails,
    getadmincount,
    getrecruitercount,
    gethiringmanagers,
    getinterviewercount,
    getinterviewscount,
    getupcominginterviews
}