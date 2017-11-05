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
      id:req.body.id,
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

        console.log(result.ops);
        res.render('liststudent',{student:student});
      }
    });
  console.log("Entry successful");
  });




};