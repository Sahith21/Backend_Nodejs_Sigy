const vendorcontroller = require('../controllers/vendorcontroller');
const express = require('express');

const router = express.Router();

router.post('/register',vendorcontroller.vendorRegister);
router.post('/login',vendorcontroller.vendorLogin);

router.get('/all-vendors',vendorcontroller.getallvendors);
router.get('/single-vendor/:vId',vendorcontroller.getVendorById)

module.exports = router;
