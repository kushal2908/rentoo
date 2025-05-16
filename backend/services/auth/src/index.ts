import app from './app';

// Start the server
const PORT = process.env.PORT || 8001;
const SERVICE_NAME = process.env.SERVICE_NAME || 'auth-service';
app.listen(PORT, () => {
    console.log(`${SERVICE_NAME} is running on port ${PORT}`);
});
