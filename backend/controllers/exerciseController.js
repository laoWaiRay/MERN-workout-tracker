const Exercise = require("../models/Exercise");
const Workout = require("../models/Workout");
const Goal = require("../models/Goal")
const mongoose = require("mongoose");

exports.listExercises = (req, res, next) => {
  const user_id = req.user._id;

  Exercise.find({ user_id })
    .sort({ name: 1 })
    .exec(function(err, exercises) {
      if (err) { return next(err) };
      res.json(exercises)
    })
}

exports.createExercise = (req, res, next) => {
  const { name, color } = req.body;
  const user_id = req.user._id;

  const exercise = new Exercise({
    name,
    color,
    user_id
  })

  exercise.save((err) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return next(err)
    }
    res.status(200).json(exercise)
  })
}

exports.updateExercise = async (req, res, next) => {
  const { name, color } = req.body;
  const user_id = req.user._id;
  const _id = req.params.id; 

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).end("Error: Invalid ID")
  }

  const exercise = await Exercise.findById({ _id })
  if (!exercise) {
    return res.status(400).json({ error: "Exercise not found" })
  }

  if (exercise.user_id !== user_id.toString()) {
    return res.status(401).json({ error: "Unauthorized user" })
  }

  const updatedExercise = new Exercise({
    name,
    color,
    user_id,
    _id
  })

  Exercise.findByIdAndUpdate(_id, updatedExercise, { new: true }, (err, updated) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return next(err)
    }
    res.status(200).json(updated)
  })
}

exports.deleteExercise = async (req, res, next) => {
  const user_id = req.user._id;
  const _id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).end("Error: Invalid ID")
  }

  const exercise = await Exercise.findById({ _id })
  if (!exercise) {
    return res.status(400).json({ error: "Exercise not found" })
  }

  if (exercise.user_id !== user_id.toString()) {
    return res.status(401).json({ error: "Unauthorized user" })
  }

  const workout = await Workout.findOne({ exercise: _id })
  const goal = await Goal.findOne({ exercise: _id })

  if (workout || goal) {
    console.log("Cannot delete")
    return res.status(400).json({ error: "Cannot delete exercise - currently in use by workout or goal" })
  }
  
  Exercise.findByIdAndRemove({ _id }, (err, removedExercise) => {
    if (err) { return next(err) }
    res.status(200).json({ removedExercise })
  })
}