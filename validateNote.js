module.exports=function validateNote(req,res,next){
    const{text}=req.body;
    if(!text||typeof text!=='string'||text.trim()===''){//makes sure if text is not missing and it is a string and not blank spaces
        return res.status(400).json({error:'note text must be a non-empty string'});  
    }
    next();//if i/p is valid it continues to route handler
};