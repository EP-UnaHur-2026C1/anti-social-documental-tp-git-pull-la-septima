const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.listen(PORT, async (err)=> {
    if(err) {
        console.error(err.message)
        process.exit(1)
    }
    console.log(`App iniciada en el puerto ${PORT}`)
})