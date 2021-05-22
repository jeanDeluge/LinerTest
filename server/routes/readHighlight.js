
const {User, Page, Theme,Highlights} = require('../models')
const express = require('express');
const router = express.Router();


router.post('/',async (req, res)=>{
    try{
        
        if(!req.body.userId){
            throw new Error('need userID')
        }else if(!(req.body.pageUrl&&req.body.pageId)){
            throw new Error('need either pageUrl or pageId')
        }
        let reqUserId = req.body.userId;
        let reqPageUrl = req.body.pageUrl;

        

        
        res.status(200).json(
            highlights
        )
    }catch(e){
        if(e.message ==='some params are missing'){
            res.status(400).json(e.message);
        }else if(e.message === `User doesn't exist`){
            res.status(400).json(e.message);
        }
    }
})

module.exports=router;