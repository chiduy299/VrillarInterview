import mongoose from "mongoose";

export default interface IRace {
    id: string,
    year: number,
    grand_fix: string,
    epoch_date: number,
    winner: string,
    time: string,
    car: string,
    laps: number
}

const RaceModel = new mongoose.Schema({
    year: {
        type: Number,
        require: true
    },
    grand_fix: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    winner: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    car: {
        type: String,
        require: true
    },
    laps: {
        type: Number,
        require: true
    }
}, { versionKey: false });

RaceModel.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id
    }
});

const RaceSchema = mongoose.model<IRace & mongoose.Document>("race", RaceModel);

export {
    IRace,
    RaceSchema
}