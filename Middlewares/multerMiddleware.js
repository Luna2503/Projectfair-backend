const multer=require('multer')

//storage- it has 2keys,1st one is destinstion & 2nd one is the file name
//destination :where the file is stored
//filename: name in which file is stored

const storage =multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter=(req,file,callback)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new ErrorEvent("only png,jpeg,jpg files are allowed"))
    }
}

const multerConfig = multer({
    storage, 
    fileFilter
})

module.exports=multerConfig;
