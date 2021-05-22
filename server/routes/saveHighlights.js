
const {User, Page, Theme, Highlights} = require('../models')
const express = require('express');
const router = express.Router();

const { body , validationResult} = require('express-validator');
const user = require('../models/user');



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
        
        const reqUserId = `${req.body.userId}`;
        const reqPageUrl = req.body.pageUrl;
        const reqColorHex = req.body.colorHex;
        const reqText = req.body.text;

        
        //let create = await Page.create({page_Url:reqPageUrl, highlights:{ colorHex:reqColorHex, text:reqText } },{include: [{association:Page.User, as:'user', where:{username: reqUserId}},{association: Page.Highlights, as:'highlights' }]}).catch(e=>{console.log(e)})

        let findPagebyUser = await Page.findOne({where: {page_Url: reqPageUrl}},{include: {model: User, as:'user', where:{username:reqUserId}}})
        let findUser = await User.findOne({where: {username:reqUserId}});
        console.log(findPagebyUser)
        let create={};

        if(!findPagebyUser){
            console.log("see?")

            create['pageAndHL'] = await Page.create({page_Url:reqPageUrl, userId:findUser.id, highlights:{ colorHex:reqColorHex, text:reqText } },{include: [{association:Page.User, as:'user', where:{username: reqUserId}},{association: Page.Highlights, as:'highlights' }]}).catch(e=>{console.log(e)})
        
        }else{

            create['highlight'] = await Highlights.create({colorHex:reqColorHex, text:reqText, pageId:findPagebyUser.id}, {include: {model:Page, as:"page", where:{page_Url:reqPageUrl}, include:{association:Page.User , as:"user", where:{username: reqUserId} }}} )
        }

        let pageId;
        let createdHLobj;
        if(!create.pageAndHL){
            createdHLobj = create.highlight.dataValues;
            pageId = create.highlight.dataValues.pageId;
        }else{
            createdHLobj = create.pageAndHL.dataValues.highlights[0].dataValues
            pageId = create.pageAndHL.dataValues.id;
        }
        res.status(200).json({
            highlightId:createdHLobj.id,
            userId:findUser.dataValues.id,
            pageId,
            colorHex:createdHLobj.colorHex,
            text: createdHLobj.text
            
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