
const {User, Page, Theme,Highlights} = require('../models')
const express = require('express');
const router = express.Router();

const { body , validationResult} = require('express-validator');

// userId, hi
router.put('/',
body('userId').not().isEmpty(),
body('themeId').not().isEmpty()
,async (req, res)=>{
    try{
        const error = validationResult(req);

        if(!error.isEmpty()){

            throw new Error('some params are missing');
        }
        
        let reqUserId = req.body.userId;
        let reqThemeId = req.body.themeId;

        let findTheme = await Theme.findOne({where:{id:reqThemeId}});
        console.log(findTheme);
        
        if(!findTheme){
            throw new Error(`you dont have ${reqThemeId} theme`)
        }
        let updateUserTheme = await User.update({currentTheme: reqThemeId},{where:{username: reqUserId}})
            .then(result =>{
                if(result[0]===1){
                  res.status(200).send(`${res.statusCode} OK`)
                }  
                res.status(400).send(`${res.statusCode} current theme aren't be updated`) 
            });

       

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