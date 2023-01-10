const express = require('express')
const Model = require('../model/model')
const router = express.Router()

// Paginaction Get All the Data Sorting
function paginactedData () {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const skipIndex = (page - 1) * limit
    const data = {}
    try {
      data.results = await Model.find()
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skipIndex)
        .exec()
      res.paginactedData = { pageNumber: page, data }
      next()
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
// All paginactedData GET Method
router.get('/users', paginactedData(), (req, res) => {
  const result = res.paginactedData
  res.json({ Users: result.data.results.length, result })
})

// Post method
router.post('/post', async (req, res) => {
  const data = new Model({
    companyName: req.body.companyName,
    userName: req.body.userName,
    age: req.body.age,
    email: req.body.email,
    phone: req.body.phone,
    pincode: req.body.pincode,
    subscriptionId: req.body.subscriptionId,
    date: req.body.date
  })

  try {
    const result = await data.save()
    res.status(200).json({
      Status_Code: 200,
      Response_Message: `user has been created successfully`,
      result
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get All the Data & Filtering Get All the Data
router.get('/', async (req, res) => {
  try {
    const result = await Model.find()
    console.log(result)
    const filter = req.query
    const filterUser = result.filter(user => {
      let isValid = true
      for (key in filter) {
        isValid =
          isValid &&
          user[key]
            ?.toLocaleLowerCase()
            .includes(filter[key].toLocaleLowerCase())
      }
      return isValid
    })
    // const totalUsers = await Model.countDocuments({});
    res.json({
      TotalUsers: filterUser.length,
      Status_Code: 200,
      Response_Message: 'user GET request successfully',
      filterUser
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// sorting GET Method all data
router.get('/users/:sorting', async (req, res) => {
  try {
    const query = req.params.query
    const data = await Model.find()
    if (query.toLocaleLowerCase() === 'ascending') {
      res.json({ totalUsers: data.length, data })
    } else if (query.toLocaleLowerCase() === 'descending') {
      const descending = data.reverce()
      res.json({ totalUsers: descending.length, descending })
    }
  } catch (error) {
    res.status.apply(500).json({ message: error.message })
  }
})

// User Update by id method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateData = req.body
    const options = { new: true }
    const result = await Model.findByIdAndUpdate(id, updateData, options)
    res.send({
      Status_Code: 200,
      Response_Message: `user has been updated successfully`,
      result
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// User Delete by id method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const data = await Model.findByIdAndDelete(id)
    res.status(200).json({
      id: `${data.id}`,
      Status_Code: 200,
      status: `user has been deleted successfully`
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
// Get Data besed on the id.
router.get('/getById/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    const result = await Model.findById(req.params.id)
    res.send({
      Status_Code: 200,
      Response_Message: `user GET request with Id `,
      result
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update user by id in put method
router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateData = req.body
    const options = { new: true }
    const result = await Model.findByIdAndUpdate(id, updateData, options)
    res.send({
      Status_Code: 200,
      Response_Message: `user has been updated successfully`,
      result
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
