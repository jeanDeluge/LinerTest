
const {User, Page, Theme,Highlights} = require('../models')
const express = require('express');
const router = express.Router();

const { body , validationResult} = require('express-validator');
const user = require('../models/user');

//userId, highlightId 필수


router.put('/',async (req, res)=>{
    try{
        
       
        if(!req.body.highlightId){
            throw new Error("needs highlightId ")
        }
        if(!req.body.userId){
            throw new Error("needs userId ")
        }
        if(!(req.body.colorHex || req.body.text)){
            throw new Error("colorHex, text both don't exist")
        } 
        
        let reqHighlightId = req.body.highlightId;
        let reqUserId = req.body.userId;
        let reqColorHex = req.body.colorHex || "null";
        let reqText = req.body.text || "null";

        let selector = {where: {id : reqHighlightId },
        include:{
            association: Highlights.Page, as:"page",
            include: {
                association: Page.User, as:"user",
                where: {username:reqUserId}
            }
            
            
        }
    }
        let updateHighlight = await Highlights.findOne(selector)
        .then(obj =>{
            if(reqColorHex === 'null'){
                return Highlights.update({text:reqText},selector)
            }
            else if(reqText==="null"){
                return Highlights.update({colorHex:reqColorHex}, selector)
            }else{
                return Highlights.update({colorHex:reqColorHex, text:reqText},selector)
            }
        })

        let findupdatedHighlight = await Highlights.findOne(selector)

        
        res.status(200).json({

            "highlightId":findupdatedHighlight.dataValues.id,
            "userId" : findupdatedHighlight.dataValues.page.userId,
            "pageId" : findupdatedHighlight.dataValues.pageId,
            "colorHex": findupdatedHighlight.dataValues.colorHex,
            "text": findupdatedHighlight.dataValues.text
        })

    }catch(e){
        if(e.message ==='some params are missing'){
            res.status(400).json({"e":e.message});
        }
        res.status(400).json({"e":e.message});
    }
})

module.exports=router;