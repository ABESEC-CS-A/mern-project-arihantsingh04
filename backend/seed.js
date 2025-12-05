const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB');
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_INIT_EMAIL });
    
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_INIT_PASSWORD, salt);
      const admin = new User({
        name: "Super Admin", 
        email: process.env.ADMIN_INIT_EMAIL,
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
    process.exit();
  })
  .catch(err => console.log(err));