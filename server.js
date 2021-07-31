const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes/routes');
const mongoConect=require('./conection/conectionMongo')


try {
    mongoConect.connect(process.env.DB_URI)
} catch (e) {
    console.log(e);
}


app.use(cors())
app.use(express.urlencoded({ extended: true })); //Usar el bodyparser que enta incluido en express
app.use(express.static('public'))
app.use(routes({}))




const listener = app.listen(process.env.PORT || 8080, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
