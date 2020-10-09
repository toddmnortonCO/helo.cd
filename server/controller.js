const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body,
        db = req.app.get("db");
        
        const foundUser = await db.users.check_user({ username });
        if (foundUser[0]) {
            return res.status(400).send('Username already in use');
        }

        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);
        
        const newUser = await db.register_user({ username, password, hash });
        req.session.user = newUser[0];
        res.status(200).send(req.session.user);
    },
    login: async (req, res) => {
        const { username, password } = req.body,
            db = req.app.get("db");
        
        const foundUser = await db.users.check_user({ username });
        if (!foundUser[0]) {
            return res.status(400).send('Username not found.')
        }

        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if (!authenticated) {
            return res.status(401).send('Password is incorrect.')
        }

        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(200).send(req.session.user);

    },
    logout: async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}
