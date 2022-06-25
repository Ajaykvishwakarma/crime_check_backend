const express = require('express');
const Post = require('../models/post.model');

const router = express.Router();

router.get('/allposts/:id',async (req,res)=>{
    try {
        
        let post = await Post.aggregate(
            [
                {
                    $match  : {user_id : req.params.id}
                },
                {
                    $lookup:
                      {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as:"userdata" ,
                      }
                 },
            ]
        )
        /* 
        {
                    user_Id : "9183745kjqwhf893745",
                    notice_text : "TEXT 1 ",
                    date : "49-may-4837",
                    "userdata"  : [
                        {
                            "_id" : "9183745kjqwhf893745",
                            "username" : "vijendrasaini0101",
                            "passowerd" : "alskdjvoiawer"
                        }
                    ]
                }
        
        */







        res.send(post)
    } catch (error) {
        res.status(500).send({message : error.message})
    }
})
router.get('/post/:id',async (req,res)=>{
    try {
        
        let post = await Post.aggregate(
            [
                {
                    $match  : {_id : req.params.id}
                },
                {
                    $lookup:
                      {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as:"userdata" ,
                      }
                 },
            ]
        )
        /* 
        {
                    user_Id : "9183745kjqwhf893745",
                    notice_text : "TEXT 1 ",
                    date : "49-may-4837",
                    "userdata"  : [
                        {
                            "_id" : "9183745kjqwhf893745",
                            "username" : "vijendrasaini0101",
                            "passowerd" : "alskdjvoiawer"
                        }
                    ]
                }
        
        */







        res.send(post)
    } catch (error) {
        res.status(500).send({message : error.message})
    }
})


router.post('/post',  async (req, res) => {
    try{
        const post = await Post.create(req.body)
        return res.status(200).send(post)
    }
    catch (error) {
        return res.status(500).send({message: error.message})
    }
})

router.get('/posts', async(req, res) => {
    try{
        let posts = await Post.aggregate(
            [
                {
                    $lookup:
                      {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as:"userdata" ,
                      }
                 },
            ]
        )
        return res.send(posts);

    } catch(error) {
        return res.status(500).send({message : error.message})
    }

})


router.delete("/post/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
  
      res.status(200).send(post);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

module.exports = router