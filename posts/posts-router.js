const router = require('express').Router();

// router.use(express.json());

const Posts = require('../data/db.js');


// create post
router.post('/', (req, res) => {
    const postData = req.body;
    const { title, contents } = req.body;

    if( !title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

    Posts.insert(postData)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
})

//create comment
router.post('/:id/comments', (req, res) => {
   const id = req.params.id;
   req.body = { ...req.body, post_id: id };
   
   Posts.findById(id)
    .then(post => {
        if(!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else if(!req.body.text){
            res.status(400).json({ errorMessage: "Please provide text for the comment." });
        } else if(post){
            Posts.insertComment(req.body)
                .then(comment => {
                    console.log(comment);
                    res.status(201).json(comment);
                });
        };
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "There was an error while saving the comment to the database" });
    });
});

//get all posts
router.get('/', (req, res) => {
    Posts.find()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved" });
        });
});

// get post by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    Posts.findById(id)
        .then(post => {
            console.log(post);
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
}) ;


// get post/id/comments

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    

    Posts.findPostComments(id)
        .then(comments => {
            console.log(comments);
            res.status(200).json(comments)       
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The comments information could not be retrieved." });
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Posts.remove(id)
        .then(deleted => {
            res.status(200).json(deleted);            
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" });
        })
})

module.exports = router;