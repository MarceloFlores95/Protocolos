const mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

const commentSchema = mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    image: {
        type: Number
    }

});

commentSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5), null)
};

commentSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
};

const commentCollection = mongoose.model('comments', commentSchema);

const Comments = {
   postComment : function(comment) {
       return commentCollection // db.students.insert(newStudent)
                .create(comment)
                .then(createComment =>{
                    return createComment;
                })
                .catch(err => {
                    return err;
                });
   },
}

module.exports = {
    Comment: commentCollection,
    Comments: Comments
}
