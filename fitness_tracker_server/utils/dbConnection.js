const mongoose=require('mongoose');

const DBconnection=async()=>{
try{
    await mongoose.connect('mongodb://localhost:27017/fitness_tracker');
    console.log('DB connected successfully...');
}catch(error){
return console.log(error.message);
}
}

module.exports=DBconnection;
