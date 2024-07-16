const JobPosting = require('../models/jobposting');

const jobtest = (req, res) => {
    res.json('test is working superbly');
};

//POST a new jobposting
const createJobPosting = async (req, res) => {
    try {
        const { jobCreatorId, jobcreatorEmail, jobTitle, vacancies, description, salary, requiredExperience, requiredSkills, approved } = req.body;

        // Check if required fields are provided
        if (!jobTitle || !salary || !requiredExperience) {
            return res.status(400).json({
                error: 'job title, salary, and required experience are required'
            });
        }

        // Find the highest jobid in the collection
        const lastJobPosting = await JobPosting.findOne().sort({ jobid: -1 });

        // Ensure lastJobPosting is valid and has a valid jobid
        const lastJobId = lastJobPosting && typeof lastJobPosting.jobid === 'number' ? lastJobPosting.jobid : 0;

        // Set the new jobid to be the highest jobid + 1
        const newJobId = lastJobId + 1;

        // Ensure newJobId is a valid number
        if (isNaN(newJobId)) {
            throw new Error('Failed to generate a valid job ID');
        }

        // Create a new job posting
        const jobPosting = await JobPosting.create({
            jobid: newJobId,
            jobCreatorId,
            jobcreatorEmail,
            jobTitle,
            vacancies,
            description,
            salary,
            requiredExperience,
            requiredSkills,
        });

        // Return the created job posting
        return res.status(201).json(jobPosting);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};

// GET all pending job postings
const getAllPendingJobPostings = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find({ pending: true }).sort({ updatedAt: -1 });

        if (!jobPostings || jobPostings.length === 0) {
            return res.status(404).json({ message: "No pending job postings found" });
        }

        return res.status(200).json(jobPostings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// GET all approved job postings
const getAllApprovedJobPostings = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find({ approved: true}).sort({ approvedAt: -1 });

        if (!jobPostings || jobPostings.length === 0) {
            return res.status(404).json({ message: "No approved job postings found" });
        }

        return res.status(200).json(jobPostings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// GET all rejected job postings
const getAllRejectedJobPostings = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find({ rejected: true }).sort({ createdAt: -1 });

        if (!jobPostings || jobPostings.length === 0) {
            return res.status(404).json({ message: "No rejected job postings found" });
        }

        return res.status(200).json(jobPostings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

//UPDATE a job post
const updateJobPosting = async(req, res) =>{
    const jobId = req.params.id;
    const updatedJob = req.body;

    try {

        const job = await JobPosting.findByIdAndUpdate(jobId, updatedJob, { new: true });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job); 
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Failed to update job post.' });
    }
}

//Delete a job post
const deleteJobPosting = async(req, res) => {
    const jobId = req.params.id;

  try {
    const deletedJob = await JobPosting.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {

    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job. Please try again later.' });
  }
}

const updateExpiredStatus = async(req,res) => {
    const jobId = req.params.id;
  const { expired } = req.body;

  try {
    const updatedJob = await JobPosting.findByIdAndUpdate(jobId, { expired }, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, message: 'Job expired status updated successfully', job: updatedJob });
  } catch (error) {
    console.error('Error updating job expired status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
//get expire = false jobs
const getNotExpiredJobposting = async (req, res) => {
    try {
        const jobPostings = await JobPosting.find({ 
            expired: false, 
            approved: true 
        }).sort({ createdAt: -1 });

        if (jobPostings.length === 0) {
            return res.status(404).json({ message: "No active job postings found" });
        }

        return res.status(200).json(jobPostings);
    } catch (error) {
        console.error('Error fetching non-expired job postings:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// PUT approve-true
const approveJobPosting = async (req, res) => {
    const jobId = req.params.id;
    const { approved } = req.body;

    try {
        const updateData = { 
            approved, 
            pending: false, 
        };

        if (approved) {
            updateData.approvedAt = new Date();
        }

        const updatedJob = await JobPosting.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({ success: true, message: 'Job approved successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job approved:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// Update reject-true
const rejectJobPosting = async (req, res) => {
    const jobId = req.params.id;
    const { rejected, improvements } = req.body;

    try {
        const updateData = { 
            rejected, 
            improvements,
            pending: false, 
        };

        const job = await JobPosting.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!job) {
            console.log('Job not found'); // Debug log
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error('Error rejecting job:', error); // Detailed error log
        res.status(500).json({ message: 'Failed to reject job.' });
    }
}



module.exports = {
    jobtest,
    createJobPosting,
    getAllPendingJobPostings,
    getAllApprovedJobPostings,
    getAllRejectedJobPostings,
    updateJobPosting,
    deleteJobPosting,
    updateExpiredStatus,
    getNotExpiredJobposting,
    approveJobPosting,
    rejectJobPosting
};
