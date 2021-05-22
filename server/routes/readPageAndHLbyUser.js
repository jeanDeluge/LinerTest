
const {User, Page, Theme,Highlights} = require('../models')
const express = require('express');
const router = express.Router();

const { body , validationResult} = require('express-validator');


router.post('/',
body('userId').notEmpty()
,async (req, res)=>{
    try{
        const error = validationResult(req);

        if(!error.isEmpty()){

            throw new Error('some params are missing');
        }
        

        let reqUserId = req.body.userId;
     
        let pageandHighlightOrdering = await Page.findAll({
            include:[ {
            association: Page.User, as: "user",
            where: { username: reqUserId}
             },{
            model: Highlights, 
            as: "highlights",
            }],
            order:[
                ['createdAt', 'DESC'],["highlights",'createdAt','DESC']
            ]
        }

        ).then(data=>{
            let newData = data.map(el => {
                return {
                    "pageId": el.dataValues.id,
                    "pageUrl": el.dataValues.page_Url,
                    "highlights": el.dataValues.highlights
                }   
            })
            return newData
        }).catch(e=>console.log(e))

        console.log(pageandHighlightOrdering)
        res.status(200).json(pageandHighlightOrdering)

    }catch(e){
        if(e.message ==='some params are missing'){
            res.status(400).json(e.message);
        }else if(e.message === `User doesn't exist`){
            res.status(400).json(e.message);
        }
    }
})

module.exports=router;