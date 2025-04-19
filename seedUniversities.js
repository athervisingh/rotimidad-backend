import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CountryUniversity from './model/University.js'; // adjust the path if needed

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/RotimiDad';

const dummyUniversityData = [
    {
      country: 'Canada',
      universities: [
        {
          name: 'University of Toronto',
          address: "27 King's College Cir, Toronto, ON",
          image: 'https://example.com/uoft.jpg',
          description: 'A top-ranked Canadian university known for research and innovation.'
        },
        {
          name: 'McGill University',
          address: '845 Sherbrooke St W, Montreal, QC',
          image: 'https://example.com/mcgill.jpg',
          description: 'One of Canada’s most prestigious universities, located in Montreal.'
        }
      ]
    },
    {
      country: 'United States',
      universities: [
        {
          name: 'Harvard University',
          address: 'Cambridge, MA',
          image: 'https://example.com/harvard.jpg',
          description: 'An Ivy League university known for excellence in law, medicine, and business.'
        },
        {
          name: 'Stanford University',
          address: '450 Serra Mall, Stanford, CA',
          image: 'https://example.com/stanford.jpg',
          description: 'A leader in technology and innovation located in Silicon Valley.'
        }
      ]
    },
    {
      country: 'Australia',
      universities: [
        {
          name: 'University of Melbourne',
          address: 'Parkville VIC 3010, Australia',
          image: 'https://example.com/melbourne.jpg',
          description: 'Renowned for research, arts, and medical programs.'
        },
        {
          name: 'University of Sydney',
          address: 'Camperdown NSW 2006, Australia',
          image: 'https://example.com/sydney.jpg',
          description: 'Australia’s first university with a reputation for excellence.'
        }
      ]
    },
    {
      country: 'India',
      universities: [
        {
          name: 'Indian Institute of Technology Bombay (IIT Bombay)',
          address: 'Powai, Mumbai, Maharashtra 400076',
          image: 'https://example.com/iitbombay.jpg',
          description: 'One of India’s top engineering institutes, known globally.'
        },
        {
          name: 'University of Delhi',
          address: 'Benito Juarez Marg, South Campus, New Delhi',
          image: 'https://example.com/du.jpg',
          description: 'A premier university offering a wide range of courses in India.'
        }
      ]
    },
    {
      country: 'United Kingdom',
      universities: [
        {
          name: 'University of Oxford',
          address: 'Oxford OX1 2JD, United Kingdom',
          image: 'https://example.com/oxford.jpg',
          description: 'One of the oldest and most prestigious universities in the world.'
        },
        {
          name: 'University of Cambridge',
          address: 'The Old Schools, Trinity Ln, Cambridge CB2 1TN, UK',
          image: 'https://example.com/cambridge.jpg',
          description: 'Renowned for academic excellence and innovation.'
        }
      ]
    },
    {
      country: 'South Africa',
      universities: [
        {
          name: 'University of Cape Town',
          address: 'Rondebosch, Cape Town, 7700, South Africa',
          image: 'https://example.com/uct.jpg',
          description: 'The top-ranked university in Africa, known for its research impact.'
        },
        {
          name: 'University of the Witwatersrand (Wits)',
          address: 'Johannesburg, South Africa',
          image: 'https://example.com/wits.jpg',
          description: 'A leading South African university known for humanities and science.'
        }
      ]
    }
  ];
  

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB ✅');

    // Optional: Clear old data
    await CountryUniversity.deleteMany();

    // Insert dummy data
    await CountryUniversity.insertMany(dummyUniversityData);
    console.log('Dummy university data inserted successfully 🎓');

    mongoose.disconnect();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
