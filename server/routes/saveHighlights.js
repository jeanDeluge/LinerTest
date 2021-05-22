
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
        
        
        let findUser = await User.findOne({where: {username:reqUserId}});
        if(!findUser){
                throw new Error('enter username')
            }
        
        //let create = await Page.create({page_Url:reqPageUrl, highlights:{ colorHex:reqColorHex, text:reqText } },{include: [{association:Page.User, as:'user', where:{username: reqUserId}},{association: Page.Highlights, as:'highlights' }]}).catch(e=>{console.log(e)})

        let findPagebyUser = await Page.findOne({where: {page_Url: reqPageUrl}},{include: {model: User, as:'user', where:{username:reqUserId}}})
        
        

        let create={};

        if(!findPagebyUser){
            console.log('if문들어옴')
            create['pageAndHL'] = await Page.create({page_Url:reqPageUrl, userId:findUser.dataValues.id, highlights:{ colorHex:reqColorHex, text:reqText, userId:findUser.dataValues.id } },{include: [{association:Page.User, as:'user', where:{username: reqUserId}},{association: Page.Highlights, as:'highlights' }]}).catch(e=>{console.log(e)})
        
        }else{
            console.log('엘스문 들어옴')
            create['highlight'] = await Highlights.create({colorHex:reqColorHex, text:reqText, pageId:findPagebyUser.dataValues.id, userId:findUser.dataValues.id}, {include: {association:Highlights.Page, as:"page", where:{page_Url:reqPageUrl}, include:{association:Highlights.User , as:"user", where:{username: reqUserId} }}} ).catch(e=>console.log(e))
        }

        console.log(create)
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
            userId:findUser.dataValues.username,
            pageId,
            colorHex:createdHLobj.colorHex,
            text: createdHLobj.text
            
        })
    }catch(e){
        if(e.message ==='some params are missing'){
            res.status(400).json(e.message);
        }else if(e.message === `User doesn't exist`){
            res.status(400).json(e.message);
        }else{
            res.status(400).json(e.message)
        }
    }
})

module.exports=router;