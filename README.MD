<h1>Pagina Protocolos (Becario)</h1>
<hr>
<h3>How to run the project:</h3>
<p> First install all dependencies with this:</p>
<pre>
    <code>npm install</code>
</pre>
<p> Then run the project with this command:</p>
<pre>
    <code>npm run</code>
</pre>
<hr>
<h3>Endpoints: </h3>
<h4>Profile:</h4>
<p>To get all the information for the profile page we need this endpoint.</p>

<pre>
    <code>
        router.get('/', isLoggedIn,function(req, res, next) {});
    </code>
</pre>
<p>Example:<p>
<p>http://localhost:8080/profile<p>

<p>To get all the information from the user we need this endpoint.</p>
<p>We need the function isLoogedIn for validate that the user is loggin</p>
<p>The route need the id of the user as parameter</p>
<p>The information will load in the profile section</p>
<pre>
    <code>
        router.get('/userInfo/:id',isLoggedIn ,(req,res,next) => {})
    </code>
</pre>

<p>To delete the user.</p>
<p>We need the function isLoogedIn for validate that the user is loggin</p>
<p>The route need the id of the user as parameter</p>
<pre>
    <code>
        router.get('/deleteUser/:id',isLoggedIn,(req,res,next) => {})
    </code>
</pre>

<p>To update all the information from the user we need this endpoint.</p>
<p>We need the function isLoogedIn for validate that the user is loggin</p>
<p>The route need the id of the user as parameter</p>
<p>The information will load in the profile section</p>
<pre>
    <code>
        router.patch('/userPatch/:id', isLoggedIn, (req,res,next) => {})
    </code>
</pre>


<p>To add a new routine to the user we need this endpoint.</p>
<p>We need the function isLoogedIn for validate that the user is loggin</p>
<p>The route need the id of the user as parameter</p>
<p>The information will load in the profile section</p>
<pre>
    <code>
        router.post('/userPushRoutine/:id',[jsonParser,isLoggedIn],(req,res,next) => {})
    </code>
</pre>
<p>The body request will have something like this: </p>
<pre>
    <code>
        monday: {
            muslce1:bicep,
            muscle2:tricep,
            exercise: [www.youtube.com/example, www.youtube.com/example]
        },
        tuesday: {
            muslce1: off,
            muscle2: off,
            exercise:[null,null]
        },
        wednesday: {
            muslce1: off,
            muscle2: off,
            exercise:[null,null]
        },
        thursday: {
           muslce1: off,
           muscle2: off,
           exercise:[null,null]
        },
        friday: {
            muslce1:bicep,
            muscle2:tricep,
            exercise: [www.youtube.com/example, www.youtube.com/example]
        }
    </code>
</pre>

<p>To modify a routine to the user we need this endpoint.</p>
<p>We need the function isLoogedIn for validate that the user is loggin</p>
<p>The route need the id of the user as parameter</p>
<p>The information will load in the profile section</p>
<pre>
    <code>
        router.patch('/userModifyRoutine/:id',[jsonParser,isLoggedIn], (req,res,next) => {})
    </code>
</pre>
<p>The body request will have something like this: </p>
<pre>
    <code>
        monday: {
            muslce1:bicep,
            muscle2:tricep,
            exercise: [www.youtube.com/example, www.youtube.com/example]
        },
        tuesday: {
            muslce1: off,
            muscle2: off,
            exercise:[null,null]
        },
        wednesday: {
            muslce1: off,
            muscle2: off,
            exercise:[null,null]
        },
        thursday: {
           muslce1: off,
           muscle2: off,
           exercise:[null,null]
        },
        friday: {
            muslce1:bicep,
            muscle2:tricep,
            exercise: [www.youtube.com/example, www.youtube.com/example]
        }
    </code>
</pre>

<p>To modify a routine to the user we need this endpoint.</p>
<p>We need the function isLoogedIn for validate that the user is loggin</p>
<p>The route need the id of the user as parameter</p>
<p>The information will load in the profile section</p>
<pre>
    <code>
    router.delete('/userDeleteRoutine/:id', isLoggedIn, (req,res,next) => { })
    </code>
</pre>
<p>In the headers we need to add the id of the routine and the position of the routine<p>

<p>To delete a routine of the user we need this endpoint.</p>
<p>We need the function isLoogedIn for validate that the user is loggin</p>
<p>The route need the id of the user as parameter</p>
<p>The information will load in the profile section</p>
<pre>
    <code>
        router.delete('/userDeleteFavorite/:id', isLoggedIn, (req,res,next) => {...})
    </code>
</pre>
<p>In the headers we need to add the id of the routine and the position of the routine<p>

<p>To logout we need this endpoint.</p>
<p>We need the function isLoogedIn for validate that the user is loggin</p>
<p>The information will load in the home section</p>
<pre>
    <code>
        router.get('/logout',isLoggedIn, (req,res, next) => {...})
    </code>
</pre>

<p>This two functions validate the route for a user that login<p>
<pre>
    <code>
    function isLoggedIn(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/')
    }
</code>
    <code>
    function notLoggedIn(req,res,next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/profile')
    }
    </code>
</pre>
<h4>Nutrition:</h4>
<p>Load all the information of the nutrition section.</p>
<p>Dont need to validate login</p>
<pre>
    <code>
        router.get('/', function(req, res, next) {});
    </code>
</pre>

<p>http://localhost:8080/nutrition</p>

<h4>Login:</h4>

<p>Load all the information of the login section.</p>
<pre>
    <code>
        router.get('/', function(req, res, next) {});
    </code>
</pre>

<p>http://localhost:8080/login</p>


<p>Load all the information of the login section.</p>
<p>This route is needed to sign up.</p>
<pre>
    <code>
        router.post('/',passport.authenticate('local.signup', {
            successRedirect:'/profile',
            failureRedirect:'/login',
            failureFlash: true
        }));
    </code>
</pre>


<p>Load all the information of the login section.</p>
<p>This route is needed to sign in.</p>
<pre>
    <code>
    router.post('/signin',passport.authenticate('local.signin', {
        successRedirect:'/profile',
        failureRedirect:'/login',
        failureFlash: true
    }));
    </code>
</pre>

<p>This two functions validate the route for a user that login<p>
<pre>
    <code>
    function isLoggedIn(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/')
    }
</code>
    <code>
    function notLoggedIn(req,res,next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/profile')
    }
    </code>
</pre>


<h4>LifeStyle:</h4>
<p>Load all the information of the life style section.</p>
<p>Dont need to validate login</p>
<pre>
    <code>
        router.get('/', function(req, res, next) {});
    </code>
</pre>

<p>http://localhost:8080/life-style</p>

<h4>Home:</h4>
<p>Load all the information of the home section.</p>
<p>Dont need to validate login</p>
<pre>
    <code>
        router.get('/', function(req, res, next) { });
    </code>
</pre>
<p>http://localhost:8080/</p>

<h4>AllUsers:</h4>
<h4>All Users:</h4>
<p>Load all the information of all users in a new section.</p>
<p>Need to validate login</p>
<pre>
    <code>
        router.get('/', function(req, res, next) {});
    </code>
</pre>
<p>http://localhost:8080/</p>



