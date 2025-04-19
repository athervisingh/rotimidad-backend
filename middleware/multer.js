import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'sliders',
    allowed_formats: ['jpg', 'png', 'jpeg', 'svg', 'avif'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }],
  },
});

const upload = multer({ storage });

export default upload;
