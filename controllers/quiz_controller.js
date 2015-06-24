+var models = require('../models/models.js');
+
 // get /quizes/question
 exports.question = function(req, res) {
-    res.render('quizes/question', { pregunta: 'Capital de Italia'});
+	models.Quiz.findAll().success(function(quiz){
+		res.render('quizes/question', { pregunta: quiz[0].pregunta });
+	});
 };
 
 // get /quizes/answer
 exports.answer = function(req, res) {
-    if ( req.query.respuesta === 'Roma') {
-        res.render('quizes/answer', { respuesta: 'Correcto'});
-    } else {
-        res.render('quizes/answer', { respuesta: 'Incorrecto'});
-    }
+	models.Quiz.findAll().success(function(quiz){
+	    if ( req.query.respuesta === quiz[0].respuesta ) {
+	        res.render('quizes/answer', { respuesta: 'Correcto'});
+	    } else {
+	        res.render('quizes/answer', { respuesta: 'Incorrecto'});
+	    }
+	});
+
 };
 // GET /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', {
        quiz: req.quiz,
        errors: []
    });
};

// GET /quizes/new
exports.new = function(req, res) {
    var quiz = models.Quiz.build({
        'pregunta': '',
        'respuesta': ''
    });
    res.render('quizes/new', {
        quiz: quiz,
        errors: []
    });
};

// GET /quizes/create
exports.create = function(req, res) {
    var quiz = models.Quiz.build(req.body.quiz);
    quiz.validate().then(function(error) {
        if (error) {
            res.render('quizes/new', {
                quiz: quiz,
                errors: error.errors
            });
        }
        else {
            quiz.save({
                fields: ['pregunta', 'respuesta', 'tema']
            }).then(function() {
                res.redirect('/quizes');
            });
        }
    });
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
    // respuesta incorrecta
    var resultado = 'Incorrecto';

    if (req.query.respuesta === req.quiz.respuesta) {
        // respuesta correcta
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {
        quiz: req.quiz,
        respuesta: resultado,
        errors: []
    });

};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
    res.render('quizes/edit', {
        quiz: req.quiz,
        errors: []
    });

};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
    req.quiz.destroy().then(function() {
        res.redirect('/quizes');
    }).catch(function(error) {next(error)});
};

// PUT /quizes/:id
exports.update = function(req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;
    req.quiz.validate().then(function(error) {
        if (error) {
            res.render('quizes/edit', {
                quiz: req.quiz,
                errors: error.errors
            });
        }
        else {
            req.quiz.save({
                fields: ['pregunta', 'respuesta', 'tema']
            }).then(function() {
                res.redirect('/quizes');
            });
        }
    });
};
