const TodoModel=require('../model/TodoModel')


exports.create=async(req,res)=>{
    try{
        let mobile=req.headers["mobile"];
        let reqBody=req.body;
        reqBody.mobile=mobile;
        await TodoModel.create(reqBody)
        res.json({stats:"Success",message:"Todo Created Successfully"})
    
    
    }catch(err){
        res.json({stats:"Fail",message:err})
    }
    }

    exports.update = async (req, res) => {
        try {
            let mobile = req.headers["mobile"];
            let { id } = req.params;
            let reqBody = req.body;
            const todo = await TodoModel.findOne({ _id: id, mobile: mobile });
    
            if (!todo) {
                return res.status(404).json({ status: "Fail", message: "Todo not found or does not belong to the user" });
            }
            await TodoModel.updateOne({ _id: id, mobile: mobile }, reqBody);
    
            res.json({ status: "Success", message: "Todo updated successfully" });
        } catch (err) {
            res.status(500).json({ status: "Fail", message: err.message });
        }
    }
    

exports.read=async(req,res)=>{
            try{
                let mobile=req.headers["mobile"];
          let data=  await TodoModel.find({mobile:mobile})

                res.json({stats:"Success",data:data})
            
            
            }catch(err){
                res.json({stats:"Fail",message:err})
            }
            }
exports.delete = async (req, res) => {
    try {
        let mobile = req.headers["mobile"];
        let { id } = req.params;
        const todo = await TodoModel.findOne({ _id: id, mobile: mobile });
        if (!todo) {
        return res.status(404).json({ status: "Fail", message: "Todo not found or does not belong to the user" });
         }
        await TodoModel.deleteOne({ _id: id, mobile: mobile });
            
        res.json({ status: "Success", message: "Todo deleted successfully" });
        } catch (err) {
        res.status(500).json({ status: "Fail", message: err.message });
        }
    }
            

exports.complete = async (req, res) => {
        try {
            let mobile = req.headers["mobile"];
            let { id } = req.params;
            const todo = await TodoModel.findOne({ _id: id, mobile: mobile });
            if (!todo) {
                return res.status(404).json({ status: "Fail", message: "Todo not found or does not belong to the user" });
            }
            await TodoModel.updateOne({ _id: id, mobile: mobile }, { status: "Complete" });
    
            res.json({ status: "Success", message: "Todo marked as complete" });
        } catch (err) {
            res.status(500).json({ status: "Fail", message: err.message });
        }
    }
    
    exports.cancel = async (req, res) => {
        try {
            let mobile = req.headers["mobile"];
            let { id } = req.params;
            const todo = await TodoModel.findOne({ _id: id, mobile: mobile });
    
            if (!todo) {
                return res.status(404).json({ status: "Fail", message: "Todo not found or does not belong to the user" });
            }
            await TodoModel.updateOne({ _id: id, mobile: mobile }, { status: "Cancel" });
    
            res.json({ status: "Success", message: "Todo marked as canceled" });
        } catch (err) {
            res.status(500).json({ status: "Fail", message: err.message });
        }
    }
    