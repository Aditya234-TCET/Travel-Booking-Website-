const express = require('express');
const router = express.Router();
const { getPackages, getPackageById, createPackage, updatePackage, deletePackage } = require('../controllers/packageController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/', authMiddleware, adminMiddleware, createPackage);
router.put('/:id', authMiddleware, adminMiddleware, updatePackage);
router.delete('/:id', authMiddleware, adminMiddleware, deletePackage);

module.exports = router;
