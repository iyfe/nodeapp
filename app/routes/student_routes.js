var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db) {

  app.get('/', function(req, res, next){
  res.render('home');
});

// Add Student Page
app.get('/student/add', function(req, res, next){
  res.render('addstudent');
});

app.post('/student/add', (req, res,next) => {

  const student = {
     first_name :  req.body.first_name,
     last_name :  req.body.last_name,
     email :  req.body.email,
     phone : req.body.phone,
     image : req.body.image,
     next_of_kin :req.body.next_of_kin,
     nok_phone :req.body.nok_phone
  };

  db.collection('students').insert(student, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        console.log("Entry successful");
        res.render('liststudent',{student:student});

      }
    });
  
  });

// List Student Page
app.get('/student/list', function(req, res, next){
  let id = req.body.id;
  res.render('searchstudent');
});

app.post('/student/list', (req, res,next) => {
  const id = req.body.id;
  const details = { '_id': new ObjectID(id) };
  db.collection('students').findOne( details,(err,item) =>{
    if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        if(!item){
          res.render('searchstudent', {
        error: 'User does not exist'
      });
        }else {
          res.render('liststudent',{student:item});

        }
      } 
  });
});

app.get('/student/all', function(req, res, next){

 db.collection("students").find({}).toArray(function(err, result) {
    if (err) {
        res.send({'error':'An error has occurred'});
      } else {
          res.render('allstudents',{student:result});
        }
  }); 
});


// Edit student Page 
app.get('/student/edit/:id', function(req, res, next){
  const id= { '_id': new ObjectID(req.params.id) };
   db.collection('students').findOne( id,(err,item) =>{
    if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        if(!item){
          res.render('searchstudent', {
        error: 'User does not exist'
      });
        }else {
          res.render('editstudent',{student:item});
        }
      } 
  });
  
});

app.post('/student/edit', (req, res,next) => {

  var myquery = { _id:new ObjectID(req.body.id)};
  var newvalues = 
    {
      first_name :  req.body.first_name,
     last_name :  req.body.last_name,
     email :  req.body.email,
     phone : req.body.phone,
     image : req.body.image,
     next_of_kin :req.body.next_of_kin,
     nok_phone :req.body.nok_phone
    };
  db.collection('students').update(myquery, {$set:newvalues}, function(err,result) {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
        if(result.result.nModified === 1){
          res.render('liststudent',{student:newvalues});
        }
      } 
    });

  });

app.post('/student/delete/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('students').deleteOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Student ' + id + ' deleted!');
       res.redirect('/student/all');
      } 
    });
  });


};