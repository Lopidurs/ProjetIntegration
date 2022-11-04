const express = require("express")
const app = express()
const fileUpload = require('express-fileupload');
const cors = require('cors')
require("dotenv").config();
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(fileUpload({createParentPath: true}));
app.use(cors())

const db = require('./models')

// Routers
const UserRouter = require('./routes/Users')
app.use("/users", UserRouter)

const PetsRouter = require('./routes/Pets')
app.use("/pets", PetsRouter)

const AnnoncesRouter = require('./routes/Annonces')
app.use("/annonces", AnnoncesRouter)

const propositionRouter = require('./routes/Propositions')
app.use("/propositions", propositionRouter)

const ImageRouter = require('./routes/Images')
app.use("/images", ImageRouter)

const adminRouter = require('./routes/Admin')
app.use("/admin", adminRouter)

if (process.env.NODE_ENV !== 'test') {
    db.sequelize.sync().then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = app;
