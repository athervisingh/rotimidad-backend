// seedCourses.js
import mongoose from 'mongoose';
import Course from './model/Course.js'; // adjust the path as needed

const MONGODB_URI = 'mongodb://localhost:27017/RotimiDad'; // Change to your DB

const dummyCourses = [
  {
    category: 'B.Tech',
    courses: [
      { name: 'Computer Science and Engineering', duration: '4 years' },
      { name: 'Mechanical Engineering', duration: '4 years' },
      { name: 'Electrical Engineering', duration: '4 years' }
    ]
  },
  {
    category: 'Pharmacy',
    courses: [
      { name: 'Bachelor of Pharmacy (BPharm)', duration: '4 years' },
      { name: 'Diploma in Pharmacy (DPharm)', duration: '2 years' }
    ]
  },
  {
    category: 'MBA',
    courses: [
      { name: 'Finance', duration: '2 years' },
      { name: 'Marketing', duration: '2 years' },
      { name: 'Human Resource Management', duration: '2 years' }
    ]
  },
  {
    category: 'Nursing',
    courses: [
      { name: 'B.Sc Nursing', duration: '4 years' },
      { name: 'Post Basic B.Sc Nursing', duration: '2 years' }
    ]
  }
];

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Optional: Clear existing courses
    await Course.deleteMany();

    // Insert dummy data
    await Course.insertMany(dummyCourses);
    console.log('Dummy course data inserted!');

    mongoose.disconnect();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
