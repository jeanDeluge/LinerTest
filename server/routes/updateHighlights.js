
const {User, Page, Theme,Highlights} = require('../models')
const express = require('express');
const router = express.Router();

const { body , validationResult} = require('express-validator');

//userId, highlightId 필수

const validcheck = [
    body("highlightId").notEmpty(),
    body("userId").notEmpty(),
    body("colorHex").notEmpty()||body("text").notEmpty()
]

router.post('/',validcheck
,async (req, res)=>{
    try{
        const error = validationResult(req);

        if(!error.isEmpty()){

            throw new Error('some params are missing');
        }
        
        let reqHighlightId = req.body.highlightId;
        let reqUserId = req.body.userId;
        let reqColorHex = req.body.colorHex || "null";
        let reqText = req.body.text || "null";

        let findchangedHighlight = await Highlights.findOne({where: {id : reqHighlightId },
            include:{
                association: Highlights.Page, as:"page",
                include:{
                    association: Page.Highlights, as:"highlights",
                    
                }
            }
        });


        console.log(findchangedHighlight, 'findchangedHighlight')

        res.status(200).json({
            

        })

    }catch(e){
        if(e.message ==='some params are missing'){
            res.status(400).json({"e":e.message});
        }
        res.status(400).json({"e":e.message});
    }
})

module.exports=router;