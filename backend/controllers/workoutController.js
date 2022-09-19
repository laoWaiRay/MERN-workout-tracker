const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise")
const mongoose = require("mongoose");

// View all workouts
exports.listWorkouts = (req, res, next) => {
  const user_id = req.user._id;

  Workout.find({ user_id })
    .populate("exercise")
    .sort({ createdAt: -1 })
    .exec(function(err, workouts) {
      if (err) { 
        res.status(400).json({ error: "Could not find workouts" })
        return next(err) 
      };
      res.status(200).json(workouts)
    })
}

// View a workout
exports.detailWorkout = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" })
  }

  Workout.findById(id)
    .populate("exercise")
    .exec((err, workout) => {
      if (err || workout == null) {
        res.status(400).json({ error: "Could not find workout" })
      }
      res.status(200).json(workout)
    })
}


// Create a workout
exports.createWorkout = (req, res, next) => {
  const user_id = req.user._id;
  const { exercise, time } = req.body;

  if (!exercise) {
    return res.status(400).json("Must choose an exercise")
  }

  if (!time) {
    return res.status(400).json("Must input a time")
  }

  const workout = new Workout({
    exercise,
    time,
    user_id
  })

  workout.save((err, newWorkout) => {
    if (err) { 
      res.status(400).json({ error: "Could not save workout" })
      return next(err)
    }
    Workout.findById(newWorkout._id)
      .populate("exercise")
      .exec((err, workout) => {
        res.status(200).json(workout)
      })
  })
}

// Update a workout
exports.updateWorkout = async (req, res, next) => {
  const user_id = req.user._id;
  const _id = req.params.id;
  const { name, time, exerciseID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid ID" })
  }

  if (!name) {
    return res.status(400).json("Must input a name")
  }

  if (!time) {
    return res.status(400).json("Must input a time")
  }

  try {
    const exercise = await Exercise.findById(exerciseID)
    exercise.name = name;
    await exercise.save()
  } catch (err) {
    console.log(err)
    return
  }
  

  const workout = await Workout.findById(_id).populate("exercise")
  if (!workout) {
    return res.status(400).json({ error: "Workout not found" })
  }

  if (workout.user_id !== user_id.toString()) {
    return res.status(401).json({ error: "Unauthorized user" })
  }

  workout.time = time;

  try {
    await workout.save()
    return res.status(200).json(workout)
  } catch (err) {
    res.status(400).json({ error: "Could not update workout" })
    return next(err)
  }
}


// Delete a workout
exports.deleteWorkout = async (req, res, next) => {
  const user_id = req.user._id;
  const _id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).end("Error: Invalid ID")
  }

  const workout = await Workout.findById({ _id })
  if (!workout) {
    return res.status(400).json({ error: "Workout not found" })
  }

  if (workout.user_id !== user_id.toString()) {
    return res.status(401).json({ error: "Unauthorized user" })
  }

  Workout.findByIdAndRemove(_id, (err, removedWorkout) => {
    if (err) { 
      res.status(400).json({ error: "Could not delete workout" })
      return next(err) 
    }
    res.status(200).json({ removedWorkout })
  })
}