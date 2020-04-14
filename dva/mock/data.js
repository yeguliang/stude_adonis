
const Mock=require('mockjs'); 
module.exports={
    ['GET /api/getData'](req,res){
     res.status(200).json(Mock.mock({
		"name": "get",
    }))},
    ['POST /api/postData'](req,res){
      res.status(200).json(Mock.mock({
     "name": "post",
     }))},
}