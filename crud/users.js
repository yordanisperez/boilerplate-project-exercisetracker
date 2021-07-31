const User= require('../model/UserSchema');



const createNewUser=async function(userJson,done){ 
  let doc = new User (userJson);
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

const findAllUser = async (done) => {
    return await User.find({},'username',(error,resp)=>{
      if (error)
      {
        console.log(error);
      }
      done(error,resp);
    })
    
  };

  const getUser = async (idUser,done) => {
    return await User.findOne({_id:idUser},'username',(error,resp)=>{
      if (error)
      {
        console.log(error);
      }
      done(error,resp);
    })
    
  };

exports.createNewUser=createNewUser
exports.findAllUser=findAllUser
exports.getUser=getUser