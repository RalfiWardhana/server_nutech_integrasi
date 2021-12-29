const {barang} = require("../../models")
const {user} = require("../../models")
const cloudinary = require("../../third-party/cloudinary")


exports.addBarang =async(req,res) => {
    try{
        const result = await cloudinary.uploader.upload(req.files.photo[0].path, {
            folder: "nutech_itegrasi_files",
            use_filename: true,
            unique_filename: false
        })
        const data =  await barang.create({
            photo : result.public_id,
            name:req.body.name,
            harga_jual:req.body.harga_jual,
            harga_beli: req.body.harga_beli,
            stock:req.body.stock,
            idUser:req.user.id
        })
        res.send({
            status: "succes",
            message :"Success to add Barang",
            data:data
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.getBarangs =async(req,res) => {
    try{
       let data =  await barang.findAll({
           include:
        {
            model : user,
            as : "user",
            attributes : {
                exclude:["createdAt","updatedAt"]
            }      
        },
           attributes:{
               exclude:["createdAt","updatedAt"]
           }
       })
       
       data = JSON.parse(JSON.stringify(data));
       
       const newData = data.map((item) => ({
        ...item,
        photo: cloudinary.url(item.photo),
      }));
  

        res.send({
            status: "succes",
            message :"Success to get Barangs",
            data :newData
        })
    }
    
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.getBarang=async(req,res) => {
    const id = req.params.id;
    try{
       let data =  await barang.findOne({
               where: {id},
               include:
                {
                    model : user,
                    as : "user",
                    attributes : {
                        exclude:["createdAt","updatedAt"]
                    }      
                },
                attributes:{
                    exclude:["createdAt","updatedAt"]
                }
                })
            data = JSON.parse(JSON.stringify(data));
       
            const newData = {
                ...data,
                photo :  cloudinary.url(data.photo)
            }
            res.send({
            status : "succes",
            message :"Success to get Barang",
            data : newData,
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}

exports.updateBarang =async(req,res) => {
    const id = req.params.id;
    try{
        const result = await cloudinary.uploader.upload(req.files.photo[0].path, {
            folder: "nutech_itegrasi_files",
            use_filename: true,
            unique_filename: false
        })
        await barang.update({
            photo : result.public_id,
            name:req.body.name,
            harga_jual:req.body.harga_jual,
            harga_beli: req.body.harga_beli,
            stock:req.body.stock 
            },{
                    where: {id}
        })
    
        const data = await barang.findOne({
            where:{id}
        })
        res.send({
            status: "succes",
            message :"Success to update Barang",
            data: data
        })
        
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}


exports.deleteBarang =async(req,res) => {
    const id = req.params.id;
    try{
       await barang.destroy({
               where: {id}
        })
       
        res.send({
            status: "succes",
            message :"Success to delete Barang",
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error",
            id:id
        })
    }
}