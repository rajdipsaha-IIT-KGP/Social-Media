const TryCatch = (handler) =>{
    return async(req,res,next)=>{
         try{
            await handler(req,res,next);
         }
         catch(err){
            console.log(err);
            return res.status(500).json({
                message:"Error Message"
            })
         }
    }
}
module.exports = TryCatch;