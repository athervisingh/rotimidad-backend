// scripts/seedSliders.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Slider from './model/Slider.js'; // adjust if needed

// Load env variables
dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;

const slider1 = [
  { color: "#F4F4F4", src: "Bangladesh.png", src2: "bangladesh.svg", text: "Bangladesh" },
  { color: "#D9E6F2", src: "Georgia.jpg", src2: "georgia.svg", text: "Georgia" },
  { color: "#C9D6DF", src: "Kazakhstan.jpg", src2: "kazakhstan.svg", text: "Kazakhstan" },
  { color: "#A8B5C3", src: "Kyrgyzstan.jpg", src2: "kyrgyzstan.svg", text: "Kyrgyzstan" },
];

const slider2 = [
  { color: "#78909C", src: "Georgia.jpg", src2: "georgia.svg", text: "Georgia" },
  { color: "#EDEDED", src: "Poland.avif", src2: "poland.svg", text: "Poland" },
  { color: "#BCCCDC", src: "russia.jpg", src2: "russia.svg", text: "Russia" },
  { color: "#98AFC7", src: "Vietnam.jpg", src2: "vietnam.svg", text: "Vietnam" },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected ✅');

    await Slider.deleteMany({}); // optional clear
    await Slider.insertMany([
      { name: 'slider1', slides: slider1 },
      { name: 'slider2', slides: slider2 }
    ]);

    console.log('Sliders seeded successfully 🚀');
  } catch (err) {
    console.error('Seeding error ❌:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

seed();
