
const {User, Page, Theme,Highlights} = require('../models')
const express = require('express');
const user = require('../models/user');
const router = express.Router();


router.post('/',async (req, res)=>{
    try{
        
        if(!req.body.userId){
            throw new Error('must have userId')
        }else if(!(req.body.pageUrl||req.body.pageId)){
            throw new Error('need either pageUrl or pageId')
        }
        let reqUserId = req.body.userId;
        let reqPageUrl = req.body.pageUrl || undefined;
        let reqPageId = req.body.pageId || undefined;
        let readHighlights;

        if(reqPageUrl === undefined){
            console.log(reqPageUrl, "reqPageUrl")
            readHighlights = await Highlights.findAll({include:[
                {
                    association: Highlights.User, as:"user", where:{username:reqUserId}
                },{
                    association: Highlights.Page, as:"page", where:{id : reqPageId}
                }
            ]})
        }else if(reqPageId === undefined){
            console.log(reqPageUrl, "reqPageUrl")
            readHighlights = await Highlights.findAll({include:[
                {
                    association: Highlights.User, as:"user", where:{username:reqUserId}
                },{
                    association: Highlights.Page, as:"page", where:{page_Url : reqPageUrl}
                }
            ]})
        }else{
            eadHighlights = await Highlights.findAll({include:[
                {
                    association: Highlights.User, as:"user", where:{username:reqUserId}
                },{
                    association: Highlights.Page, as:"page", where:{id: reqPageId}
                }
            ]}) 
        }


        
        res.status(200).json(
            readHighlights
        )
    }catch(e){
        if(e.message ==='some params are missing'){
            res.status(400).json(e.message);
        }else if(e.message === `User doesn't exist`){
            res.status(400).json(e.message);
        }else{
            res.status(400).json(e.message);
        }
    }
})

module.exports=router;