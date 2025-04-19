import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  color: { type: String, required: true },
  src: { type: String, required: true },
  src2: { type: String, required: true },
  text: { type: String, required: true }
});

const sliderSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "slider1" or "slider2"
  slides: {
    type: [slideSchema],
    validate: [arr => arr.length === 4, 'Slider must contain exactly 4 slides']
  }
}, {
  timestamps: true,
});

const Slider = mongoose.model('Slider', sliderSchema);
export default Slider;
