const express = require('express');
const companyModel = require('../../models/companyModel');

const router = express.Router();


router.get('/',companyModel.find_companies);
router.get('/find',companyModel.find_company_by_id);

module.exports = router;