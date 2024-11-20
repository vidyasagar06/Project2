const mongoose = require('mongoose');
mongoose.set('debug', true);  // Enable debug mode to print more logs

async function RunServer() {
    try {
        await mongoose.connect('mongodb+srv://jeshu0759:X5JfsHYn1aMgb9ih@cluster0.hmcdi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
}

module.exports = RunServer;5


//new password: X5JfsHYn1aMgb9ih