const express = require('express');
const router = express.Router();
const bcrypt = require('bcruptjs');

//Fetch all staffs
router.get('/fetch-all-staffs', async (req, res) => {
    try {
        const stafs = await Saff.find().sort({ createdAt: -1 });
        return res.status(200).send({ status: 'ok', msg: 'success', data: staffs });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ status: 'error', msg: 'some error occurred', error: e.message });
    }

});

// Create new staff
router.post('/create-staff', async (req, res) => {
    const { name, email, password, role, department } = req.body

    if (!name || !email || !password || !department) {
        return res.status(400).send({ status: 'error', msg: 'required field must be filled' });

    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const staff = await Staff.create({
            name,
            email,
            password: hashedPassword,
            role,
            department
        });

        return res.status(201).send({ status: 'ok', msg: 'success', data: staff });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ status: 'error', msg: 'some error occurred', error: e.message });
    }
});

//Delete staff
router.delete('/delete-staff/:id', async (req, res) => {
    try{
        console.log(req)
        const staff= await StafflfindByIdAndDelete(req.params.id);
        if (!staff) {
            return res.status(404).send({status: 'error', msg:
            'Staff not found'});
        }
        return res.status(200).send({status: 'ok', msg: 'success' })
    } catch (e) {
        console.error(e);
        return res.status(500).send ({status: 'error', msg: 'some error occurred', error: e.message});
    }

});  


//Edit staff 
router.put('/edit-staff/:id', async (req, res) => {
    try {
        let updateData = {...req.body};   
    
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateDaata.password = await bcrypt.hash(updateData.password, salt);
        }

        const staff= await Staff.findByIdAndUpdate(req.params.id,updateData, {
            new: true, //retun the updated document
            runValidators: true
        });

        if (!staff) {
            return res.status(404).send({status: 'error',msg: 'Staff not found'});
        }
        return res.status(200).send({status: 'ok', msg: 'success', data: staff });
    }catch (e) {
        console.error(e);
        return res.status(500).send({status: 'error', msg: 'some error occurred', error: e.message});
    }

}); 