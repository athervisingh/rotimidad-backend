import mongoose from 'mongoose';

const SubCourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
});

const CourseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  courses: [SubCourseSchema],
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
