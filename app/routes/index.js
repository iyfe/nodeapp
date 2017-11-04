const noteRoutes = require('./note_routes');
const studentRoutes = require('./student_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
  studentRoutes(app, db);
  // Other route groups could go here, in the future
};