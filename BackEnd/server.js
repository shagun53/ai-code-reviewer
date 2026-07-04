const app = require('./src/app');
const connectDB = require('./src/config/db');

connectDB(); // connect to MongoDB on startup

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
});