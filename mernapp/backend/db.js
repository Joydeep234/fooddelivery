const mongoose=require('mongoose');
const mongoURI='mongodb+srv://gofood:gofood123@cluster0.ggk92gy.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const mongoDB=async() =>{
    try {
        await mongoose.connect(mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log('Connected to the database');
    
        const fetchedData = mongoose.connection.db.collection('fooddATA');
        
       const datas= await fetchedData.find({}).toArray();
        const foodCatagory=await mongoose.connection.db.collection('foodCatagory');
        const catData=await foodCatagory.find({}).toArray();
            global.food_items=datas;
            global.foodcatagory=catData;
         //global.food_items=datas;  
          //console.log(global.food_items);
        }
       catch (err) {
        console.error(err);
      }
   
    };


module.exports=mongoDB;