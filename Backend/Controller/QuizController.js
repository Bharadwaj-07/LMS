const Quiz = require("../Models/Quiz");

// 📌 GET all quizzes for a specific course
exports.getQuizzes = async (req, res) => {
  try {
    const { courseId } = req.query;
    if (!courseId) return res.status(400).json({ error: "Course ID is required" });

    const quizzes = await Quiz.find({ courseId }).sort({ quizNumber: 1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 POST: Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
      const { courseId, quizNumber, questions } = req.body;
  
      // Validate input
      if (!courseId || !quizNumber || !questions.length) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Find existing quiz
      const existingQuiz = await Quiz.findOne({ courseId, quizNumber });
  
      if (existingQuiz) {
        // Update the existing quiz
        existingQuiz.questions = questions;
        await existingQuiz.save();
        return res.status(200).json({ message: `Quiz ${quizNumber} updated successfully`, quiz: existingQuiz });
      } else {
        // Create a new quiz if it doesn't exist
        const newQuiz = new Quiz({ courseId, quizNumber, questions });
        await newQuiz.save();
        return res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
      }
    } catch (error) {
      console.error("Error creating/updating quiz:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  

// 📌 DELETE: Delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) return res.status(404).json({ error: "Quiz not found" });

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
