const express = require('express');
const User = require('../models/user.js');
const router = express.Router();


// router logic will go here - will be built later on in the lab

// MAIN

router.get('/', async (req, res) => {
    try {
      // find the user
      const currentUser = await User.find({userId: req.session.user._id});
  
      res.render('dreams/index.ejs', {
        dreams: currentUser.bucketList,});
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  // OPEN NEW ACTIVITY PAGE

  // OPEN NEW ACTIVITY FORM PAGE

  router.get('/add', async (req, res) => {
    res.render('dreams/new.ejs');
});

  // ADD NEW ACTIVITY

  router.post('/dreams', async (req, res) => {
    try {
      // Find the user by session ID
      const currentUser = await User.findById(req.session.user._id);
      
      // Create a new dream object and push it into the user's bucket list
      const newDream = {
        activity: req.body.activity,
        category: req.body.category,
        notes: req.body.notes,
        photo: req.body.photo,
        status: req.body.status || 'Not Started'
      };
  
      currentUser.bucketList.push(newDream);
      
      // Save the changes to the user record
      await currentUser.save();
      
      // Redirect to the newly added dream's page (showing the specific dream)
      res.redirect(`/users/${currentUser._id}/dreams`);
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
      const dream = currentUser.bucketList.id(req.params.dreamId);
      // Render the show view, passing the application data in the context object
      res.render('dreams/show.ejs', {dream});
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
    const dream = currentUser.bucketList.id(req.params.dreamId);
    res.render('dreams/edit.ejs', {
      dream,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// PUT/UPDATE A DREAM
router.put('/:dreamId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const dream = currentUser.bucketList.id(req.params.dreamId);

    // Update the dream data
    dream.set(req.body);

    // Save the changes to the user record
    await currentUser.save();

    // Redirect to the updated dream's show page
    res.redirect(`/dreams/${req.params.dreamId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

 //DELETE
 router.delete('/:dreamId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.bucketList.id(req.params.dreamId).remove(); // Use remove() to delete
    await currentUser.save();
    res.redirect('/dreams');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;