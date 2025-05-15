const mongoose = require('mongoose')

const Roles = {
    LEADER: 'leader',
    MEMBER: 'member'
}

const ProjectMemberSchema = new mongoose.Schema({
    member: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    role: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.MEMBER,
        required: true
    },
    joined_at: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true });


module.exports = mongoose.model('ProjectMember', ProjectMemberSchema);