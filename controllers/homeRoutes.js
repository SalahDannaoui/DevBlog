const router = require('express').Router();
const withAuth = require('../utils/withAuth');

const { Blog, Comment, User } = require('../Models');


router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route

    try {

        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }

        res.render('signup', {
            logged_in: req.session.logged_in
        });

    } catch (error) {
        console.log(error);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route

    console.log(req.session.logged_in)
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        res.render('login', {
            logged_in: req.session.logged_in
        });
    } catch (error) {
        console.log(error);
    }

});

router.get('/logout', (req, res) => {

    res.redirect('/');
});


router.get('/:id', async (req, res) => {
    try {
        // Get all blogs and JOIN with user data
        const blogData = await Blog.findByPk(req.params.id,
            {
                include: [{ model: User }],
            });

        // Serialize data so the template can read it
        const blog = blogData.get({ plain: true });

        console.log(blog);

        const commentsData = await Comment.findAll({
            where: {
                blog_id: blog.id,
            },
            include: [{ model: User }],
        });

        // Serialize data so the template can read it
        const comments = commentsData.map((post) => post.get({ plain: true }));

        console.log(comments);

        // Pass serialized data and session flag into template
        res.render('viewblog', {
            blog,
            comments,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/', async (req, res) => {
    try {
        // Get all blogs and JOIN with user data

        const blogData = await Blog.findAll({
            include: [{ model: User }],
            order: [['updatedAt', 'DESC']],
        });
        const blog = blogData.map((post) => post.get({ plain: true }));


        // Pass serialized data and session flag into template

        res.render('homepage', {
            blog,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;