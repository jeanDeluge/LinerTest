
const {User, Page, Theme,Highlights} = require('../models')


module.exports={

    saveHighlights: async (req, res, next) => {
       
        try{
            const userId = req.body.userId;
            const pageUrl = req.body.pageUrl;
            const colorHex = req.body.colorHex;
            const text = req.body.text;

            //하이라이트 모델에 추가해야할 것,
            //id 는 저절로 생기고
            
            const highlight = await Highlights.create({
                text : text,
                colorHex: colorHex
            }).then((result)=>{
                console.log(result);
                return result
            }).catch(err =>{
                console.log(err)
            })

            const page = await Page.create({

            })
            
            // userid는 highlightId join 으로 가져오고
            // pageid 도 join으로 가져오고
            //text 는 바로 가져오기
            

            const highlightId;
            const pageId;
            
            res.status(200).json({
                highlightId,userId,colorHex,text
            })
            
        }catch(e){
            
        }
    }

}