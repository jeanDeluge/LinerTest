
const {User, Page, Theme,Highlights} = require('../models')
const express = require('express');
const router = express.Router();

const { body , validationResult} = require('express-validator');

const validcheck = [
    body('userId').not().isEmpty(),
    body('pageUrl').not().isEmpty()||body('pageId').notEmpty()
]

router.post('/',
validcheck
,async (req, res)=>{
    try{
        const error = validationResult(req);

        if(!error.isEmpty()){

            throw new Error('some params are missing');
        }
        
        let reqUserId = req.body.userId;
        let reqPageUrl = req.body.pageUrl;this.subscribe

        let findPage = await Page.findOne({where:{page_Url:reqPageUrl}})
        let readHighlight = await Highlights.findAll({where: {page_Id: findPage.id}})

        
        //console.log(findPage,'findPage');
        
        let highlights = []; 
        highlights =readHighlight.map(el => {return {'highlihgtId': el.dataValues.id, 'userId':reqUserId, 'pageId':el.dataValues.page_Id, 'colorHex':el.dataValues.colorHex, 'text':el.dataValues.text}});

        console.log(highlights)
        
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