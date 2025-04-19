import express from 'express';
import Slider from '../model/Slider.js';
import upload from '../middleware/multer.js'
const router = express.Router();

// GET /api/sliders/:name
router.get('/:name', async (req, res) => {
  console.log("sd")
  try {
    const slider = await Slider.findOne({ name: req.params.name });
    if (!slider) return res.status(404).json({ message: 'Slider not found' });
    res.json(slider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post(
  '/:sliderName/:index',
  // Use multer middleware to handle file uploads.
  upload.fields([{ name: 'src' }, { name: 'src2' }]),
  async (req, res) => {
    try {
      const { sliderName, index } = req.params;
      const slideIndex = parseInt(index, 10);
      const { text, color } = req.body;

      // Find slider by name (assuming sliderName is stored in lowercase in DB)
      const slider = await Slider.findOne({ name: sliderName.toLowerCase() });
      if (!slider) {
        return res.status(404).json({ error: 'Slider not found' });
      }

      // Validate slide index
      if (slideIndex < 0 || slideIndex >= slider.slides.length) {
        return res.status(400).json({ error: 'Invalid slide index' });
      }

      // Update slide data
      const slide = slider.slides[slideIndex];
      slide.text = text;
      slide.color = color;

      // If files were uploaded, update the image URLs.
      if (req.files && req.files.src && req.files.src[0]) {
        // Cloudinary returns the secure URL in file.path
        slide.src = req.files.src[0].path;
      }
      if (req.files && req.files.src2 && req.files.src2[0]) {
        slide.src2 = req.files.src2[0].path;
      }

      await slider.save();

      res.json(slide);
    } catch (err) {
      console.error('Error updating slide:', err);
      res.status(500).json({ error: 'Failed to update slide' });
    }
  }
);

export default router;
