import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/')
    .post(validate(schema.storeUser), (req, res) => {
        userCtrl.store(req, res);
    })
    .get( (req, res) => {
        userCtrl.findAll(req, res);
    });


router.route('/:id')
    .get( (req, res) => {
        userCtrl.findById(req, res);
    })
    .put(isAuthenticated, (req, res) => {
        userCtrl.update(req, res);
    })
    .delete(isAuthenticated, (req, res) => {
        userCtrl.destroy(req, res);
    });


export default router;