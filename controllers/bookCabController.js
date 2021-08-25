import asyncHandler from 'express-async-handler';
import BookCab from '../models/bookCabModel.js'
import { v4 as uuidv4 } from 'uuid';

// @desc Book Cab
// @route POST /api/bookcab
// @access Private
export const bookCab = asyncHandler(async (req, res) => {
    req.body.user = req.user._id
    console.log(req.body)
    const newBooking = await new BookCab(req.body).save();
    res.json(newBooking);
})

// @desc List Bookings
// @route POST /api/bookcab/pastBookings
// @access Private
export const listPastBookings = asyncHandler(async (req, res) => {
    const { page, perPage } = req.body
    const currentPage = page || 1

    const pastBookings = await BookCab.find({ user: req.user._id }).skip((currentPage - 1) * perPage).populate('user', 'name email').exec()
    res.json(pastBookings);
})

// @desc Check for available cabs
// @route POST /api/bookcab/checkavailablecabs
// @access Private
export const checkCabs = asyncHandler(async (req, res) => {
    let cabsArray = []
    // generate random cabs
    const noOfCabsToShow = await generateRandomNumber(1, 5)
    for (let i = 0; i < noOfCabsToShow; i++) {
        cabsArray.push({ cabType: "Micro", price: generateRandomNumber(100, 500), id: uuidv4() })
    }

    res.json(cabsArray)
})


const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



