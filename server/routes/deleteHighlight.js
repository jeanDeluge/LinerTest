
const {User, Page, Theme,Highlights} = require('../models')
const express = require('express');
const router = express.Router();

const { body , validationResult} = require('express-validator');


router.delete('/',
body('userId').not().isEmpty(),
body('highlightId').not().isEmpty()
,async (req, res)=>{
    try{
        const error = validationResult(req);

        if(!error.isEmpty()){

            throw new Error('some params are missing');
        }
        
        let reqHighlightId = req.body.highlightId;
        let reqUserId = req.body.userId;

        let deleteHighlight = await Highlights.destroy({where: {id: reqHighlightId}}).then(result => {
            if(result === 1){

                 res.status(200).send(`${res.statusCode} OK`)
            }else{
                res.status(400).send(`${res.statusCode} failed delete the Highlight`)
            }
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