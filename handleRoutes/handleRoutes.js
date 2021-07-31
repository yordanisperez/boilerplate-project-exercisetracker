const ejerc=require('../crud/exercise');
const user=require('../crud/users');
const TIMEOUT=10000;



function handleHom(req, res) {
    console.log("Manipulador de Peticion 'handleHom' fue llamado. ");
    res.sendFile(process.cwd() + '/views/index.html');
    
  }
    /*===================================
      =Handle new User:Res send obj json= 
      ={_id:id_user,name:username}      =
      ===================================*/
function handlePostUsers(req,res,next){
    console.log("Manipulador de petición 'handlePostUsers' fue llamado. ")
    const userName=req.body.username;
    try{
        let t=setTimeout(()=>
        {
          next({ message: "timeout" });
        },TIMEOUT);
        user.createNewUser({ username:userName},(error,data)=>
        {
          clearTimeout(t);
          if (error){
              return next(error);
          }
          console.log('User add User added successfully : ',data);
          const {_id,username}=data;
          res.json({_id:_id,username:username});
        });

    }catch(error){
        console.log(error);
 
    }
}
    /*===================================
      =Handle Get User:Res send obj json= 
      ={_id:id_user,name:username}      =
      ===================================*/
function handleGetUsers(req,res,next){
    console.log("Manipulador de petición 'handleGetUsers' fue llamado. ")
    try{
        let t=setTimeout(()=>
        {
          next({ message: "timeout" });
        },TIMEOUT);
        user.findAllUser((error,data)=>
        {
          clearTimeout(t);
          if (error){
              return next(error);
          }
          console.log('Shows Users successfully : ',data);          
          res.json(data);
        });

    }catch(error){
        console.log(error);
 
    }
   
}

function handlePostEjerc(req,res,next){
    const userid=req.params._id;
    const description=req.body.description;
    const duration=req.body.duration;
    const date=req.body.date? new Date(req.body.date):new Date(Date.now());
    console.log("Manipulador de petición 'handlePostEjerc' fue llamado. ",userid);

    try{
        let t=setTimeout(()=>
        {
          next({ message: "timeout" });
        },TIMEOUT);
        ejerc.createNewExercise({ user:userid ,description:description,duration:duration,date:date.getTime()},(error,data)=>
        {
          clearTimeout(t);
          if (error){
              return next(error);
          }
          else{
            console.log('Exersice  added successfully : ',data);
            const {description,duration,date,user}=data;
            const dateTime= new Date(date)
            res.json({description:description,duration:duration,date:dateTime.toUTCString(),user:user});
            }
        });

    }catch(error){
        console.log(error);
    }
}

function handleGetLogs(req,res,next){
    console.log("Manipulador de petición 'handleGetLogs' fue llamado. ",req.query);
   
    const userid=req.params._id;
    const from=req.query.from?new Date(req.query.from):new Date('1970-01-01');
    const to=req.query.to?new Date(req.query.to):new Date( Date.now());
    const limit=req.query.limit;
    console.log('from: ',from.getTime(),'to: ',to.getTime());
    try{
        let t=setTimeout(()=>
        {
          next({ message: "timeout" });
        },TIMEOUT);
        ejerc.findAllExercise({user:userid, date: { $gte: from, $lt:to }},(error,data)=>
        {
            clearTimeout(t);
            if (error){
                return next(error);
            }
            const count = data.length;
            console.log('limit: ',limit?limit:count);
            const logs=data.slice(0,limit?limit:count)
                            .map((it,indexIt)=>{
                                return {
                                    description:it.description,
                                    duration:it.duration,
                                    date:it.date.toDateString()
                                }
                            }) ;
            console.log('Shows Exercises successfully : ',logs);     
            let t1=setTimeout(()=>
            {
                next({ message: "timeout" });
            },TIMEOUT); 
            user.getUser(userid,(error,dataUser)=>{
                clearTimeout(t1);
                if (error){
                    return next(error);
                }
                else{
                    console.log(dataUser);
                    res.json({_id:dataUser._id,username:dataUser.username,count:count, log:logs});
                }
                
            })
 
        });

    }catch(error){
        console.log(error);
       
    }
   
    
}


  exports.handleHom=handleHom
  exports.handlePostUsers=handlePostUsers
  exports.handleGetUsers=handleGetUsers
  exports.handlePostEjerc=handlePostEjerc
  exports.handleGetLogs=handleGetLogs