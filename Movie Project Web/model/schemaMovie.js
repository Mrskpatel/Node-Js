const mongoose = require("mongoose");

const Movie = mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        language : {
            type : String,
            required : true
        },
        genres : {
            type : String,
            required : true
        },
        director : {
            type : String,
            required : true
        },
        writers: {
            type: String,
            required: true
        },
        country : {
            type : String,
            required : true
        },
        date : {
            type: Date,
            required: true
        },
        image : {
            type : String,
            required : true,
        },
    },
);

const movieTbl = mongoose.model("Movie-Project" , Movie)

module.exports = movieTbl