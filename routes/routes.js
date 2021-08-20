const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://Awesomewott:Password1234@cluster0.kxwjd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true, 
    useNewUrlParser: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});


let salt = bcrypt.genSaltSync(10);

let accountSchema = mongoose.Schema({
    username: String,
    password: String, 
    email: String, 
    age: Number,
    state: String,
    color: String, 
    middle: String
}); 

let Account = mongoose.model('Account_Connection', accountSchema);

exports.index = (req, res) => {
    Account.find((err, account) => {
    res.render('index', {
        title: `Hello!`,
        accounts: account
        });
    });
};

exports.home = (req, res) => {
    res.render('Home'), {
        title: `Hey ${req.body.username}`
    };
};

exports.login = (req,res) => {
    const inputUser = {username: req.body.username}
    Account.find(inputUser, (err,user) => {
        if(err) return console.error(err);
        console.log(inputUser)
        console.log(user);
        //console.log(bcrypt.compareSync(req.body.password, user.password))
        console.log(user[0].username);
        if(bcrypt.compareSync(req.body.password, user[0].password))
        {
            req.session.user = {
                isAuthenticated: true,
                username: req.body.username
            }
            res.redirect('/home');
        }
        else{
            res.redirect('/');
        }
    })
    //bcrypt.compareSync(req.body.password, database password)
}

exports.create = (req, res) => {
    res.render('create', {
        title: 'Create New Profile'
    });
};

exports.createAccount = (req, res) => {
    //if(err) return console.error(err);
    let profiles = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        state: req.body.state,
        color: req.body.color,
        middle: req.body.middle
    });
    profiles.password = bcrypt.hashSync(profiles.password, salt);
    profiles.save((err, profiles) => {
        if(err) return console.error(err);
        console.log(req.body.username);
    });
    res.redirect('/');
}

exports.edit = (req, res) => {
    res.render('edit', {
        title: 'Edit account'
    });
};

exports.editAccount = (req, res) => {
    Profile.findByEmail(req.params.email, (err, account) => {
        account.username = req.body.username,
        account.password = req.body.password,
        account.email = req.body.email,
        account.age = req.body.age,
        account.state = req.body.state,
        account.color = req.body.color,
        account.middle = req.body.middle;
        profiles.password = bcrypt.hashSync(profiles.password, salt);
        account.save((err, account) => {
            if(err) return console.error(err);
            console.log(req.body.username);
        });
        res.redirect('/');
    });
};

