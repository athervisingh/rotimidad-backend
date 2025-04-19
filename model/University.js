import mongoose from 'mongoose';

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String }, // Store Cloudinary/public URL
  description: { type: String }
});

const CountryUniversitySchema = new mongoose.Schema({
  country: { type: String, required: true },
  universities: [UniversitySchema]
});

const CountryUniversity = mongoose.model('CountryUniversity', CountryUniversitySchema);

export default CountryUniversity;
