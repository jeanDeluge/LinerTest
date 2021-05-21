
const {User, Page, Theme, Highlights} = require('../models')
const express = require('express');
const router = express.Router();

const { body , validationResult} = require('express-validator');



router.post('/',
body('userId').not().isEmpty(),
body('pageUrl').not().isEmpty(),
body('colorHex').not().isEmpty(),
body('text').not().isEmpty()
,async (req, res)=>{
    try{
        const error = validationResult(req);

        if(!error.isEmpty()){

            throw new Error('some params are missing');
        }
        
        const reqUserId = req.body.userId;
        const reqPageUrl = req.body.pageUrl;
        const reqColorHex = req.body.colorHex;
        const reqText = req.body.text;

        //let createHighlight = await Highlights.create({colorHex:reqColorHex, text:reqText, page_Id:Page.id, pages:{page_Url: reqPageUrl}}, {include: [ Page ]})

        let findUser = await User.findOne({where: {username : reqUserId}});
        let findPage = await Page.findOne({where: {page_Url : reqPageUrl }});
        let createHighlight = await Highlights.create({colorHex: reqColorHex, text: reqText, page_Id: findPage.id})

        console.log(createHighlight);
        res.status(200).json({
            "highlightId": createHighlight.id,
            "userId":findUser.id,
            "pageId":findPage.id,
            "colorHex":createHighlight.dataValues.colorHex,
            "text" : createHighlight.dataValues.text
        })
    }catch(e){
        if(e.message ==='some params are missing'){
            res.status(400).json(e.message);
        }else if(e.message === `User doesn't exist`){
            res.status(400).json(e.message);
        }
    }
})

module.exports=router;