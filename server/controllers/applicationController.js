const Application = require('../models/application');
const InterviewSchedule = require('../models/interviewSchedule');


const uploadApplication = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { invitation_id, job_id, user_id, user_name, user_email, approval } = req.body;

        // Get the file key from S3 upload
        const fileKey = req.file.key;

        // Construct the full URL for the uploaded file
        const cvUrl = `https://application-mergx.s3.ap-south-1.amazonaws.com/${fileKey}`;

        // Create new application instance
        const newApplication = new Application({
            invitation_id,
            job_id,
            user_id,
            user_name,
            user_email,
            cv: cvUrl,
            approval
        });

        // Save the application to the database
        await newApplication.save();

        res.status(201).json({ message: 'Application uploaded successfully', application: newApplication });
    } catch (error) {
        console.error('Error in uploading application:', error);
        res.status(500).json({ message: 'Failed to upload application' });
    }
};


const getApplicationsGroupedByJobId = async (req, res) => {
    try {
        // Use the MongoDB aggregation framework to group applications by job_id
        const groupedApplications = await Application.aggregate([
            {
                $sort: { createdAt: -1 } // Sort by createdAt in descending order
            },
            {
                $group: {
                    _id: '$job_id', // Group by job_id
                    job_id: { $first: '$job_id' },
                    applications: {
                        $push: {
                            _id: '$_id',
                            invitation_id: '$invitation_id',
                            user_id: '$user_id',
                            user_name: '$user_name',
                            user_email: '$user_email',
                            cv: '$cv',
                            approval: '$approval',
                            rejected: '$rejected',
                            createdAt: '$createdAt'
                        }
                    },
                    count: { $sum: 1 },
                    latestUpdate: { $first: '$createdAt' } // Track the latest update time
                }
            },
            {
                $sort: { latestUpdate: -1 } // Sort by the latest update time in descending order
            }
        ]);

        res.status(200).json(groupedApplications);
    } catch (error) {
        console.error('Error in getting applications grouped by job_id:', error);
        res.status(500).json({ message: 'Failed to get applications grouped by job_id' });
    }
};

//put
const approveApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;

        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            { approval: true, rejected: false },
            { new: true } // This option returns the updated document
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application approved successfully', application: updatedApplication });
    } catch (error) {
        console.error('Error in approving application:', error);
        res.status(500).json({ message: 'Failed to approve application' });
    }
};
//put
const rejectApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;

        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            { approval: false, rejected: true },
            { new: true } // This option returns the updated document
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application approved successfully', application: updatedApplication });
    } catch (error) {
        console.error('Error in approving application:', error);
        res.status(500).json({ message: 'Failed to approve application' });
    }
};

//get approved true data is joined false
const getapprovedtruedata = async (req, res) => {
    try {
        const applications = await Application.find({ 
            approval: true,
            isjoined : false
        }).sort({ createdAt: -1 });

        if (applications.length === 0) {
            return res.status(404).json({ message: "No approved applications found" });
        }

        // Fetch corresponding interview schedules
        const applicationWithSchedules = await Promise.all(applications.map(async (application) => {
            const interviewSchedule = await InterviewSchedule.findById(application.invitation_id);
            return {
                ...application.toObject(),
                interviewSchedule: interviewSchedule ? interviewSchedule.toObject() : null
            };
        }));

        res.status(200).json(applicationWithSchedules);
    } catch (error) {
        console.error('Error fetching approved applications:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

//getapprovedtrueisjoinedtrue
const getisjoinedtrue = async (req,res)=>{
    try {
        const applications = await Application.find({
            approval: true,
            isjoined:true
        }).sort({createdAt: -1 });

        if (applications.length === 0) {
            return res.status(404).json({ message: "No approved applications found" });
        }
         // Fetch corresponding interview schedules
         const applicationWithSchedules = await Promise.all(applications.map(async (application) => {
            const interviewSchedule = await InterviewSchedule.findById(application.invitation_id);
            return {
                ...application.toObject(),
                interviewSchedule: interviewSchedule ? interviewSchedule.toObject() : null
            };
        }));

        res.status(200).json(applicationWithSchedules);
    } catch (error) {
        console.error('Error fetching approved applications:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

//put isjoined true
const updateisjoinedtrue = async(req, res) =>{
    try {
        const applicationId = req.params.id;

        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            { isjoined: true },
            { new: true } // This option returns the updated document
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: 'interview not found' });
        }

        res.status(200).json({ message: 'interview joined successfully', application: updatedApplication });
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ message: 'failed join interview' });
    }
}



const getApplications = async (req, res) => {
    try {
      const applications = await Application.find(
        { isjoined: true }, // Query condition
        { job_id: 1, user_id: 1, user_name: 1, user_email: 1, _id: 0 } // Field selection
      );
      
      console.log('Applications found:', applications); // Log the result
  
      if (applications.length === 0) {
        console.log('No applications found that match the query conditions.');
      }
  
      res.status(200).json({ applications });
    } catch (error) {
      console.error('Error in getting applications:', error);
      res.status(500).json({ message: 'Failed to get applications' });
    }
  };


  const getAllApplicationCount = async(req,res)=>{
    try{
        const count = await Application.countDocuments({});
        res.status(200).json({ total: count });
    }catch(err){
        res.status(500).json({ error: 'Error counting documents', details: err });
    }
  }
  

module.exports = {
    uploadApplication,
    getApplicationsGroupedByJobId,
    approveApplication,
    rejectApplication,
    getApplications,
    rejectApplication,
    getapprovedtruedata,
    getisjoinedtrue,
    updateisjoinedtrue

};
