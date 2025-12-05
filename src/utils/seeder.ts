import { User } from '../app/modules/user/user.model';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();

// Sample data
const usersData = [
  {
    fullName: 'Testing Admin',
    email: 'admin@gmail.com',
    password: '$2a$08$cUQ3uMdbQjlyDF/dgn5mNuEt9fLJZqq8TaT9aKabrFuG5wND3/mPO',
    role: 'admin',
    isEmailVerified: true,
  },
  {
    fullName: 'Testing User',
    email: 'user@gmail.com',
    password: '$2a$08$cUQ3uMdbQjlyDF/dgn5mNuEt9fLJZqq8TaT9aKabrFuG5wND3/mPO',
    role: 'user',
    isEmailVerified: true,
  },
];

// Function to drop the entire database
const dropDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log('------------> Database dropped successfully! <------------');
  } catch (err) {
    console.error('Error dropping database:', err);
  }
};

// Function to seed users
const seedUsers = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(usersData);
    console.log('Users seeded successfully!');
  } catch (err) {
    console.error('Error seeding users:', err);
  }
};

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    const dbUrl = process.env.MONGODB_URL;
    if (!dbUrl) throw new Error('MONGODB_URL not set in environment variables');

    await mongoose.connect(dbUrl);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

// Main function to seed the database
const seedDatabase = async () => {
  try {
    await connectToDatabase();
    await dropDatabase();
    await seedUsers();
    console.log('--------------> Database seeding completed <--------------');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.disconnect().then(() => console.log('Disconnected from MongoDB'));
  }
};

// Execute seeding
seedDatabase();



// import { User } from '../app/modules/user/user.model'; // Adjust the path to your User model
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Sample data for users
// const usersData = [
//   {
//     fullName: 'Testing Admin',
//     email: 'admin@gmail.com',
//     password: '1qazxsw2',
//     role: 'admin',
//     isEmailVerified: true,
//   },
//   // {
//   //   fullName: 'Testing Business',
//   //   email: 'business@gmail.com',
//   //   password: '$2a$08$cUQ3uMdbQjlyDF/dgn5mNuEt9fLJZqq8TaT9aKabrFuG5wND3/mPO',
//   //   role: 'businessman',
//   //   isEmailVerified: true,
//   // },
//   {
//     fullName: 'Testing User',
//     email: 'user@gmail.com',
//     password: '$2a$08$cUQ3uMdbQjlyDF/dgn5mNuEt9fLJZqq8TaT9aKabrFuG5wND3/mPO',
//     role: 'user',
//     isEmailVerified: true,
//   },
// ];

// // Function to check if any users exist in the database
// const checkIfUsersExist = async () => {
//   const userCount = await User.countDocuments();
//   return userCount === 0;
// };

// // Function to drop the entire database
// const dropDatabase = async () => {
//   try {
//     await mongoose.connection.dropDatabase();
//     console.log('------------> Database dropped successfully! <------------');
//   } catch (err) {
//     console.error('Error dropping database:', err);
//   }
// };

// // Function to seed users (add default users if no users exist)
// const seedUsers = async () => {
//   try {
//     const usersExist = await checkIfUsersExist();

//     if (usersExist) {
//       // Create admin user first
//       const adminUser = {
//         fullName: 'Testing Admin',
//         email: 'admin@gmail.com',
//         password: '1qazxsw2',
//         role: 'admin',
//         isEmailVerified: true,
//       };

//       await User.create(adminUser);
//       console.log('Admin user created successfully!');

//       // Now seed other users
//       await User.insertMany(usersData);
//       console.log('Users seeded successfully!');
//     } else {
//       console.log('Users already exist in the database. Skipping seeding.');
//     }
//   } catch (err) {
//     console.error('Error seeding users:', err);
//   }
// };

// // Connect to MongoDB
// const connectToDatabase = async () => {
//   try {
//     const dbUrl = process.env.MONGODB_URL;
//     if (!dbUrl) throw new Error('MONGODB_URL not set in environment variables');

//     await mongoose.connect(dbUrl);
//     console.log('Connected to MongoDB');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//     process.exit(1); // Exit process with failure
//   }
// };

// // Main function to seed the database
// const seedDatabase = async () => {
//   try {
//     await connectToDatabase();
//     await dropDatabase(); // Optional: Drop the database for a fresh start
//     await seedUsers(); // Seed users if none exist
//     console.log('--------------> Database seeding completed <--------------');
//   } catch (err) {
//     console.error('Error seeding database:', err);
//   } finally {
//     mongoose.disconnect().then(() => console.log('Disconnected from MongoDB'));
//   }
// };

// // Execute seeding
// seedDatabase();
