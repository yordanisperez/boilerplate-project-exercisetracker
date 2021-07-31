const {Schema,model} =require('mongoose');

const ExerciseSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: false,
        default:Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

});

module.exports = model('Exercise', ExerciseSchema);