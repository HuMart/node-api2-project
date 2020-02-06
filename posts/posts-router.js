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
   try {
       Posts.findById(id)
        .then(response => {
            if(response.length !== 0){
                if(req.body.text) {
                    const comment = {
                        text: req.body.name,
                        post_id: id
                    }
                    Posts.insertComment(comment);
                    res.status(201).json(comment);
                } else {
                    res.status(400).json({ errorMessage: "Please provide text for the comment." });
                }
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
   } catch {
       res.status(500).json({ error: "The comments information could not be retrieved." });
   }
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


module.exports = router;