const express = require('express');
const User = require('../models/user.js');
const router = express.Router();


// router logic will go here - will be built later on in the lab

// MAIN

router.get('/', async (req, res) => {
    try {
      // find the user
      const currentUser = await User.find( {userId: req.session.user._id});
  
      res.render('dreams/index.ejs', {
        dreams: currentUser.bucketList,});
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  // OPEN NEW ACTIVITY PAGE

  router.get('/add', async (req, res) => {
    res.render('dreams/new.ejs');
});

  // ADD NEW ACTIVITY

router.post('/dream-list', async (req, res) => {
    try {
      console.log('Form data:', req.body);
      // find the user
      const currentUser = await User.findById(req.session.user._id);
      // add the app to the dreams array on the user object
      currentUser.bucketList.push(req.body);
      // save the changes to the user record.
      await currentUser.save();
      // redirect usr to index page
      res.redirect(`/${currentUser.bucketList[currentUser.bucketList.length - 1]._id}`);
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
});


router.get('/:dreamId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the application by the applicationId supplied from req.params
    const dream = currentUser.dreams.id(req.params.dreamId);
    // Render the show view, passing the application data in the context object
    res.render('dreams/show.ejs', {
      dream,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

 //DELETE
 router.delete('/:dreamId', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Use the Mongoose .deleteOne() method to delete
    // an application using the id supplied from req.params
    currentUser.dreams.id(req.params.dreamId).deleteOne();
    // Save changes to the user
    await currentUser.save();
    // Redirect back to the dreans index view
    res.redirect(`/users/${currentUser._id}/dreams`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

//EDIT

router.get('/:dreamId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const dream = currentUser.dreams.id(req.params.dreamId);
    res.render('dreams/edit.ejs', {
      dream,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:dreamId', async (req, res) => {
  try {
    // Find the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Find the current application from the id supplied by req.params
    const dream = currentUser.foods.id(req.params.dreamId);
    // Use the Mongoose .set() method
    // this method updates the current application to reflect the new form
    // data on `req.body`
    dream.set(req.body);
    // Save the current user
    await currentUser.save();
    // Redirect back to the show view of the current application
    res.redirect(`/users/${currentUser._id}/dreams/${req.params.dreamId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;