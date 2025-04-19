import express from 'express';
import Course from '../model/Course.js';

const router = express.Router();

// GET all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// POST new course
router.post('/', async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json(course);
});

// PUT update course by ID
router.put('/:id', async (req, res) => {
  const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE a specific sub-course from a course category
router.delete('/:courseId/subcourse/:subIndex', async (req, res) => {
  const { courseId, subIndex } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Remove the sub-course at index
    course.courses.splice(subIndex, 1);

    await course.save();
    res.json({ message: 'Sub-course deleted', course });
  } catch (err) {
    console.error('Error deleting sub-course:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE course by ID
router.delete('/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: 'Course deleted' });
});




export default router;
