import app from './app';

// Start the server
const PORT = process.env.PORT || 8002;
const SERVICE_NAME = process.env.SERVICE_NAME || 'booking-service';
app.listen(PORT, () => {
    console.log(`${SERVICE_NAME} is running on port ${PORT}`);
});
