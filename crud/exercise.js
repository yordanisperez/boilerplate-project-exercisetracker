const Exercise= require('../model/ExerciseSchema');



const createNewExercise=async function(exerciseJson,done){ 
  let doc = new Exercise (exerciseJson);
  await doc.save()
          .then((saveDoc)=>
          {
              done(null,doc)
          })
          .catch((error)=>{
              done(error,doc)
          })
  return doc;
}


const findAllExercise = async (jsonEjerc,done) => {
    return await Exercise.find(jsonEjerc,(error,resp)=>{
      if (error)
      {
        console.log(error);
      }
      done(error,resp);
    })
    
  };
exports.createNewExercise=createNewExercise
exports.findAllExercise=findAllExercise
