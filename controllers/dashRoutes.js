const router = require('express').Router();
const withAuth = require('../utils/withAuth');

const { Blog, User } = require('../Models');

router.get('/', withAuth, async (req, res) => {
    try {
        // Get all blogs and JOIN with user data

        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [{ model: User }],
            order: [['updatedAt', 'DESC']],
        });

               const blog = blogData.map((post) => post.get({ plain: true }));

       
        // Pass serialized data and session flag into template
        const userPosts = true;
        console.log(blog);
        res.render('homepage', {
            blog,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
            userPosts,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// to create a blog post
router.get('/create', withAuth, async (req, res) => {

    res.render('create', {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
    });

});


// to edit a blog post
router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);

        // Serialize data so the template can read it
        const blog = blogData.get({ plain: true });

        console.log(blog);

        // Pass serialized data and session flag into template
        res.render('create', {
            blog,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;