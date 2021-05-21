const {User, Highlights, Page, Theme, UserTheme} = require('../models')
const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();

router.get('/',async (req, res)=>{

    try{
        let [theme1, create1] = await Theme.findOrCreate({where : {id : 1}  , defaults : {color1:"#ffff8d",color2:"#a5f2e9",color3:"#ffd5c8"}})
        console.log(create1, 'create1')
        let [theme2, create2] = await Theme.findOrCreate({where : {id : 2 }  , defaults : {color1:"#f6f0aa",color2:"#d3edd1",color3:"#f9d6c1"}})
        
        let [theme3, create3] =await Theme.findOrCreate({where : {id : 3 }  , defaults : {color1:"#f4ff40",color2:"#8affd7",color3:"#ffc477"}})

        let [user, userCreated] =await User.findOrCreate({where: {username : "12312"}, defaults: {theme_Id : 1, currentTheme:1}})

        let [page, pageCreated] = await Page.findOrCreate({where: {page_Url: "www.getliner.com" ,user_Id: "12312"}});

        res.status(200).json({
            user, theme1, theme2, theme3, page
        })

    }catch(e){
        console.log(e, e.message);
        res.status(400).json(e);
    }

})

module.exports=router;