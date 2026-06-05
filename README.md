# nodejs-learning

Quick steps to connect to MongoDB and run the app:

1. Copy `.env.example` to `.env` and fill in the `MONGO_URI_DEV` (or `MONGO_URI_PRO`) value.

2. To use a local MongoDB server, set:

    MONGO_URI_DEV=mongodb://localhost:27017/dbDev

    Make sure MongoDB is running locally (e.g., `mongod`).

3. To use MongoDB Atlas, paste your connection string in `MONGO_URI_DEV`.

4. Install dependencies:

```bash
npm install
```

5. Start the app:

```bash
npm start
```

6. Check logs — the app prints connection attempts and errors to the console.

If you want me to test the connection here, tell me whether you have a local MongoDB running or an Atlas URI to use.
