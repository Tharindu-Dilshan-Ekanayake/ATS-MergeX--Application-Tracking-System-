const InterviewSchedule = require('../models/interviewSchedule');

// Post interview schedule
const createInterviewSchedule = async (req, res) => {
    try {
        const { jobId, creatorId,jobtitle, date, start_time, end_time, subject, assign, link, password, experience, skills, description } = req.body;
        
        // Create interview schedule in the database
        const interviewschedule = await InterviewSchedule.create({
            jobId,
            creatorId,
            jobtitle,
            date,
            start_time,
            end_time,
            subject,
            assign,
            link,
            password,
            experience,
            skills,
            description,
            send:false
        });
        return res.status(200).json({ message: 'Interview Schedule created successfully', interviewschedule });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Get interview schedules
const getInterviewSchedules = async (req, res) => {
    try {
        const { jobId } = req.query;

        // Optionally filter by jobId if provided
        const filter = jobId ? { jobId } : {};

        // Retrieve interview schedules from the database
        const interviewschedules = await InterviewSchedule.find(filter);

        return res.status(200).json(interviewschedules);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

const deleteInterviewSchedule = async (req, res) => {
    try {
        const { interviewId } = req.params;

        if (!interviewId) {
            return res.status(400).json({ error: 'Missing interviewId' });
        }

        // Delete interview schedule from the database
        const result = await InterviewSchedule.findByIdAndDelete(interviewId);

        if (!result) {
            return res.status(404).json({ error: 'Interview Schedule not found' });
        }

        return res.status(200).json({ message: 'Interview Schedule deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Update interview schedule
const updateInterviewSchedule = async (req, res) => {
    const { date, start_time, end_time, subject, assign, link, password } = req.body;
    const interviewId = req.params.interviewId;
  
    try {
      if (!date || !start_time || !end_time || !subject || !link || !password) {
        console.log('Missing fields:', { date, start_time, end_time, subject, link, password });
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const interviewschedule = await InterviewSchedule.findByIdAndUpdate(
        interviewId,
        {
          date,
          start_time,
          end_time,
          subject,
          assign,
          link,
          password,
        },
        { new: true }
      );
  
      if (!interviewschedule) {
        return res.status(404).json({ error: 'Interview Schedule not found' });
      }
  
      return res.status(200).json({ message: 'Interview Schedule updated successfully', interviewschedule });
    } catch (error) {
      console.error('Error updating interview schedule:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
  

module.exports = {
    createInterviewSchedule,
    getInterviewSchedules,
    deleteInterviewSchedule,
    updateInterviewSchedule
};
