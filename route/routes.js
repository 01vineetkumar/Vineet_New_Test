const router = require('express').Router()
const controllers = require('../controller/controllers')
const path = require('path')

const multer = require('multer')

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let paths = path.resolve(__dirname, 'image/');
        cb(null, paths)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + `.${file.originalname.split('.').pop()}`)
    }
});
const Upload = multer({
    storage: Storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Invalid File Format: Only .png, .jpg and .jpeg format allowed!'));
        }
      }
})

router.post('/register', controllers.register)
router.post('/otp', controllers.otp)
router.post('/verify' , controllers.verifyotp)
router.post("/template", Upload.single("image"),  controllers.template)
router.get("/mytemplate",  controllers.mytemplate)
router.put("/template",  controllers.update_template)
router.post("/pay",  controllers.Pay)



module.exports = router