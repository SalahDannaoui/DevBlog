const Blog = require('./blog');
const User = require('./user');
const Comment = require('./comment');

// A user can have many blog posts
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Blog belongs to user
Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// A blog post can have many comments
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

// comment is connected to one blog post
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
});

// a user can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// a comment only has one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {
    Blog,
    User,
    Comment
};