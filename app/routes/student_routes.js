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
        res.redirect('/');
      }
    });
  console.log("Entry successful");
  });


//List student page 
app.get('/student/list', function(req, res, next){
  res.render('editstudent');
   console.log("list");
});
// process student id 
app.post('/student/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('students').find(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.render('liststudent');
      } 
    });
  });

app.delete('/student/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('student').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Student ' + id + ' deleted!');
      } 
    });
  });


};