const mongoose = require("mongoose");

let BirthdaySchema = new mongoose.Schema({
    text: String,
    title: String,
    description: String,
    featureImage: String,
    claps: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: String
        }
    ]
});

BirthdaySchema.methods.clap = function() {
    this.claps++;
    return this.save()
}

BirthdaySchema.methods.comment = (c) => {
    this.comments.push(c);
    return this.save()
}

BirthdaySchema.methods.addAuthor = function (authorId) {
    this.author = authorId;
    return this.save()
}

BirthdaySchema.methods.getUserBirthday = (_id) => {
    BirthdaySchema.find({author: _id})
    .then((birthday) => {
        return birthday;
    })
};

module.exports = mongoose.model("Birthday", BirthdaySchema);