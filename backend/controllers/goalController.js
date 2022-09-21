const Goal = require("../models/Goal");
const mongoose = require("mongoose");

exports.listGoals = (req, res, next) => {
  const user_id = req.user._id;

  Goal.find({ user_id })
    .populate("exercise")
    .sort({ createdAt: -1 })
    .exec(function(err, goals) {
      if (err) { 
        res.status(400).json({ error: "Could not find goals" })
        return next(err) 
      };
      res.status(200).json(goals)
    })
}

exports.detailGoal = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" })
  }

  Goal.findById(id)
    .populate("exercise")
    .exec((err, workout) => {
      if (err || workout == null) {
        res.status(400).json({ error: "Could not find workout" })
      }
      res.status(200).json(workout)
    })
}

exports.createGoal = (req, res, next) => {
  const user_id = req.user._id;
  const { goal_type, exercise } = req.body;
  let { time, frequency } = req.body;

  if (!goal_type || (!time && !frequency) || !exercise) {
    res.status(400).json("Missing field")
  }

  if (!time) {
    if (goal_type === "time") {
      return res.status(400).json("Invalid goal type and time or frequency pairing")
    }
    time = 0;
  }
  if (!frequency) {
    if (goal_type === "frequency") {
      return res.status(400).json("Invalid goal type and time or frequency pairing")
    }
    frequency = 0;
  }


  const refId = mongoose.Types.ObjectId(exercise)
  console.log(refId)

  Goal.find({ exercise: refId }, (err, data) => {
    if (data.length != 0) {
      res.status(400).json({ error: "Goal for selected exercise already exists" })
      return
    }

    const goal = new Goal({
      goal_type,
      time,
      frequency,
      achieved: false,
      user_id,
      exercise
    })
  
    goal.save((err, newGoal) => {
      if (err) { 
        res.status(400).json({ error: "Could not save goal" })
        return next(err)
      }
      Goal.findById(newGoal._id)
        .populate("exercise")
        .exec((err, goal) => {
          res.status(200).json(goal)
        })
    })
  })
}

exports.updateGoal = async (req, res, next) => {
  const user_id = req.user._id;
  const _id = req.params.id;
  const { goal_type, exercise } = req.body;
  let { time, frequency }= req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid ID" })
  }

  if (!goal_type || (!time && !frequency) || !exercise) {
    return res.status(400).json("Missing field")
  }

  if (!time) {
    if (goal_type === "time") {
      return res.status(400).json("Invalid goal type and time or frequency pairing")
    }
    time = 0;
  }
  if (!frequency) {
    if (goal_type === "frequency") {
      return res.status(400).json("Invalid goal type and time or frequency pairing")
    }
    frequency = 0;
  }

  const goal = await Goal.findById(_id)
  if (!goal) {
    return res.status(400).json({ error: "Goal not found" })
  }

  if (goal.user_id !== user_id.toString()) {
    return res.status(401).json({ error: "Unauthorized user" })
  }

  goal.goal_type = goal_type;
  goal.time = time;
  goal.frequency = frequency;
  goal.exercise = exercise;

  goal.save((err, goal) => {
    if (err) {
      res.status(400).json({ error: "Could not update goal" })
      return next(err)
    }
    Goal.findById(goal._id)
    .populate("exercise")
    .sort({ createdAt: -1 })
    .exec(function(err, goals) {
      if (err) { 
        res.status(400).json({ error: "Could not find goals" })
        return next(err) 
      };
      res.status(200).json(goals)
    })
  })
}

exports.deleteGoal = async (req, res, next) => {
  const user_id = req.user._id;
  const _id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).end("Error: Invalid ID")
  }

  const goal = await Goal.findById({ _id })
  if (!goal) {
    return res.status(400).json({ error: "Goal not found" })
  }

  if (goal.user_id !== user_id.toString()) {
    return res.status(401).json({ error: "Unauthorized user" })
  }

  Goal.findByIdAndRemove(_id, (err, removedGoal) => {
    if (err) { 
      res.status(400).json({ error: "Could not delete goal" })
      return next(err) 
    }
    res.status(200).json({ removedGoal })
  })
}