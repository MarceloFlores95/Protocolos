const mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

const commentSchema = mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type : mongoose.Schema.Types.String,
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
   postComment : function(comment,email,name) {
        const data = {
            userName:name,
            email: email,
            comment: comment 
        }
       return commentCollection // db.students.insert(newStudent)
                .create(data)
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
