const QandAmodel = require('../models/qanda');
const {sendMail} = require('../helpers/sendMail')

//post end point Q and A
const postqanda =  async(req, res) => {
    try {
        const {username, useremail, message, read, sent } = req.body;
        //create database
        const qanda = await QandAmodel.create({
            username,
            useremail,
            message,
            read,
            sent
        });

        sendMail(useremail, "Thank you for your message!", 
            `Dear ${username},
    
    Thank you for reaching out to us. We have received your message and appreciate your interest.
    
    We will review your inquiry and get back to you as soon as possible. Our team is committed to providing timely responses, typically within 1-2 business days.
    
    If you have any urgent matters, please don't hesitate to contact us directly at 0710821694.
    
    Thank you for your patience and understanding.
    
    Best regards,
    MergeX Team
    (Application Tracking System)`)

        return res.status(201).json({ message: 'Updated successfully', qanda });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//get end point
const getmessage = async(req, res) => {
    try {
        const QandAs = await QandAmodel.find();
        return res.status(200).json({QandAs});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//get send false endpoint
const getsendfalsemessage = async(req, res) =>{
    try {
       const QandAs = await QandAmodel.find({sent : false}).sort({createdAt: -1}) ;
       return res.status(200).json({QandAs});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}



//get send true endpoint
const getsendtruemessage = async(req, res) => {
    try {
        const QandAs = await QandAmodel.find({sent : true}).sort({createdAt: -1});
        return res.status(200).json({QandAs})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//put reply
const putreply = async (req, res) => {
    try {
        const { id } = req.params;
        const { reply } = req.body;

        if (!reply) {
            return res.status(400).json({ error: 'Reply is required' });
        }

        const updatedQandA = await QandAmodel.findByIdAndUpdate(
            id,
            { reply, sent: true },
            { new: true }
        );

        if (!updatedQandA) {
            return res.status(404).json({ error: 'Q&A entry not found' });
        }

        // Send an email to the user with the reply
        await sendMail(
            updatedQandA.useremail,
            "Response to Your Inquiry",
            `Dear ${updatedQandA.username},

We have responded to your inquiry. Here's our reply:

${reply}

If you have any further questions, please don't hesitate to reach out.

Best regards,
MergeX Team
(Application Tracking System)`
        );

        return res.status(200).json({ message: 'Reply sent successfully', qanda: updatedQandA });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//put read is true endpoint
const putreadtrue = async(req, res) => {
    try {
        const { id } = req.params;

        const updatedQandA = await QandAmodel.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );

        if (!updatedQandA) {
            return res.status(404).json({ error: 'Q&A entry not found' });
        }

        return res.status(200).json({ message: 'Message marked as read', qanda: updatedQandA });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//delete 
const deleteQandA =async(req, res) => {
    try {
        const {id} = req.params;
        const deletedQandA = await QandAmodel.findByIdAndDelete(id);

        if (!deletedQandA) {
            return res.status(404).json({error: 'Q and A entry not found'});
        }

        return res.status(200).json({message: 'Q and A entry deleted successfully', deletedQandA})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//get count read is false end point
const getcountnewmassages = async(req, res) => {
    try {
        const count = await QandAmodel.countDocuments({ read: false });
        return res.status(200).json({ newMessagesCount: count });
    } catch (error) {
        console.error('Error getting new message count:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    postqanda,
    getmessage,
    getsendfalsemessage,
    getsendtruemessage,
    putreply,
    putreadtrue,
    deleteQandA,
    getcountnewmassages

}