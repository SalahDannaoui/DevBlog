const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../Models');

const userData = require('./users.json');
const blogData = require('./blogs.json');
const commentsData = require('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentsData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();