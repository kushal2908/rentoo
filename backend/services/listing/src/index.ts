import app from './app';

// Start the server
const PORT = process.env.PORT || 8003;
const SERVICE_NAME = process.env.SERVICE_NAME || 'listing-service';
app.listen(PORT, () => {
    console.log(`${SERVICE_NAME} is running on port ${PORT}`);
});
