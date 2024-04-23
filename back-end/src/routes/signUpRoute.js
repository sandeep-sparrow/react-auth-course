import { getDbConnection } from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {

        const { email, password } = req.body;
        const db = getDbConnection('react-auth-db');
        
        // findOne
        const user = await db.collection('users').findOne({ email });

        // check if ther is no such user
        if(user){
            res.sendStatus(409);
        }
        
        // encrypt password... SECURITY 1
        const passwordHash = await bcrypt.hash(password, 10);

        // email and password Hash, need to store additional info..
        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        };

        // create a new user
        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
        });

        // get the Id from the above resilt, Mongo Db automatically assign an unique id
        const { insertedId } = result; // di-construction

        // generate JSON web token, with all the above information
        jwt.sign({
            id: insertedId,
            email: email,
            info: startingInfo,
            isVerified: false,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
        },
        (err, token) => {
            if(err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ token });
        });
    }
}