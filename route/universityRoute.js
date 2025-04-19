import express from 'express';
import upload from '../middleware/multer.js';
import University from '../model/University.js';

const router = express.Router();

// GET all universities
router.get('/', async (req, res) => {
  const universities = await University.find();
  res.json(universities);
});

// ADD new university
router.post('/:country', upload.single('image'), async (req, res) => {
  const { name, address, description } = req.body;
  const country = req.params.country;

  const university = {
    name,
    address,
    description,
    image: req.file.path, // Just storing the URL
  };

  let record = await University.findOne({ country });

  if (record) {
    record.universities.push(university);
    await record.save();
  } else {
    record = await University.create({ country, universities: [university] });
  }

  res.json(record);
});

// UPDATE university
router.put('/:country/:universityId', upload.single('image'), async (req, res) => {
  const { name, address, description } = req.body;
  const { country, universityId } = req.params;

  const record = await University.findOne({ country });
  if (!record) return res.status(404).json({ message: 'Country not found' });

  const uni = record.universities.id(universityId);
  if (!uni) return res.status(404).json({ message: 'University not found' });

  if (req.file) {
    // Can't delete old image since we don't have public_id
    uni.image = req.file.path;
  }

  uni.name = name;
  uni.address = address;
  uni.description = description;

  await record.save();
  res.json(record);
});

// DELETE university (image won't be deleted from Cloudinary)
// DELETE university (image won't be deleted from Cloudinary)
router.delete('/:country/:universityId', async (req, res) => {
  const { country, universityId } = req.params;

  const record = await University.findOne({ country });
  if (!record) return res.status(404).json({ message: 'Country not found' });

  const uni = record.universities.id(universityId);
  if (!uni) return res.status(404).json({ message: 'University not found' });

  // Remove the university from the array
  record.universities.pull({ _id: universityId });
  await record.save();

  res.json({ message: 'University deleted (image remains on Cloudinary)' });
});


// In your routes/university.js or similar file

router.delete('/:country', async (req, res) => {
  const { country } = req.params;
  try {
    const result = await University.findOneAndDelete({ country });
    if (!result) return res.status(404).json({ message: 'Country not found' });

    // OPTIONAL: If you want to delete images from Cloudinary
    // for (let uni of result.universities) {
    //   const publicId = getPublicIdFromUrl(uni.image); // You need to define this function
    //   if (publicId) {
    //     await cloudinary.uploader.destroy(publicId);
    //   }
    // }

    res.json({ message: `All universities from ${country} deleted.` });
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
