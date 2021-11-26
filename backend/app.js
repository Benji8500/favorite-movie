//installed dotenv to use environment var
//installes morgan to log http req and res
//

const express = require('express')
const mongoose = require('mongoose')
const Movie = require('./models.js/movie')
const app = express()

//Mongo

main().catch((err) => console.log(err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/favorite-movie').then(() => {
        console.log('Database Connected')
    })
}



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.get('/api/films', (req,res) =>{
  Movie.find().then(documents=>{
    res.status(200).json({
      message:"films fetched succesfully",
      films:documents
    })
  })
})

app.post('/api/films', (req,res) =>{
  const movie = new Movie({
    poster:req.body.poster,
    title:req.body.title,
    year: req.body.year,
    rating:req.body.rating,
    comment:req.body.comment
  })
  movie.save()
  .then(createdMovie=>{
    res.status(201).json({
      message:"film saved succesfully",
      id:createdMovie._id
    });
  })
});

app.delete('/api/films/:id', (req,res)=>{
  const id = req.params.id
  Movie.findByIdAndDelete(id).then(result=>{
    res.status(200).json({message:"message Deleted"})
  })
})

app.put('/api/films/:id', (req,res)=>{
  Movie.findByIdAndUpdate(req.params.id,req.body).then(result=>{
    res.status(200).json({message:"message Deleted"})
  })
})




//Server

app.listen(3000, () => {
    console.log('Server is runnin on port 3000')
})
