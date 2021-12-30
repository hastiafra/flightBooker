
const { MongoClient } = require("mongodb");
require("dotenv").config();


const { MONGO_URI } = process.env;

// console.log(MONGO_URI)

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const {flights, reservations} = require("./data") 

let flightNum = Object.keys(flights)


let flightInfo= flightNum.map((flight)=>{
return { _id: flight , seats: flights[flight]}
})

// console.log(flightInfo)


const batchImport = async (req, res) => 


{
    
    try {
     
      const client = new MongoClient(MONGO_URI, options);
  
      await client.connect();
      
      const db = client.db("SlingAir");
      
      await db.collection("flight").insertMany(flightInfo);


      
      await db.collection("reservations").insertMany(reservations);

      client.close();
  
      console.log("success!");
  
      // console.log(greetings)
  } catch(err) {

      console.log(err);

  }

  };
  
  batchImport();