import app from './app.js';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;
dotenv.config();

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});