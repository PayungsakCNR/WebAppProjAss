module.exports = function (app, passport) {

    //Render Homepage
    app.get('/', function (req, res) {
        res.render('index.ejs'); 
    });
    //Render Login Page
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    //Login management
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    //Render Sign Up Page
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // Sign up management
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', //Successfully
        failureRedirect: '/signup', //Not Successfully
        failureFlash: true 
    }));

    //If logined successfully , check user role for render site
    app.get('/profile', isLoggedIn, function (req, res) {
        if(req.user.local.role == 'ADMIN'){
            res.render('profile-dev-new.ejs', {
                user: req.user 
            });
        }
        else{
            res.render('profile-user-new.ejs', {
                user: req.user 
            });
        }

    });

    //Logout Function
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

//is Login Now ?? if not redirect to home
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
