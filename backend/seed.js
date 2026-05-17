require('dotenv').config();
const mongoose = require('mongoose');
const Candidate = require('./models/Candidate');
const connectDB = require('./config/db');

const dummyCandidates = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    experience: 4,
    bio: "Full-stack developer with 4 years of experience building scalable MERN stack applications. Led a team of 3 to migrate a legacy app to React."
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    skills: ["Python", "Django", "PostgreSQL", "AWS", "Docker"],
    experience: 5,
    bio: "Backend specialist focused on Python ecosystem. Strong experience in cloud infrastructure and containerization. Built an analytics pipeline handling 1M+ events/day."
  },
  {
    name: "Charlie Davis",
    email: "charlie@example.com",
    skills: ["JavaScript", "HTML", "CSS", "React", "Tailwind CSS"],
    experience: 2,
    bio: "Creative frontend developer passionate about UI/UX. Built several responsive web apps with React and Tailwind. Always learning new frontend trends."
  },
  {
    name: "Diana Prince",
    email: "diana@example.com",
    skills: ["Java", "Spring Boot", "MySQL", "AWS", "Kubernetes", "Node.js"],
    experience: 6,
    bio: "Senior software engineer with enterprise experience in Java and Spring Boot. Recently transitioned to Node.js microservices. Expertise in Kubernetes deployment."
  },
  {
    name: "Evan Wright",
    email: "evan@example.com",
    skills: ["React", "Vue.js", "Node.js", "Firebase", "MongoDB"],
    experience: 3,
    bio: "Versatile javascript developer comfortable with multiple frameworks. Built real-time applications using Firebase and Node.js. Active open source contributor."
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Candidate.deleteMany(); // Clear existing
    console.log('Existing candidates removed');
    
    await Candidate.insertMany(dummyCandidates);
    console.log('Dummy candidates seeded successfully');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
