import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
    path: '/api/users/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;
        const updates = (({
            favoriteFood,
            hairColor,
            bio,
        }) => ({
            favoriteFood,
            hairColor,
            bio,
        }))(req.body);

        if(!authorization){
            return res.sendStatus(401).json({ message: 'No authorization header send'});
        }

        // Bearer dlksdlk.lnildnf943dsdfsaddnkcdn093.u309lmsalkfad
        const [, token] = authorization.split(' ');
        
        // Verify JSON web token
        jwt.verify(token, process.env.JWT_SECRET, async(error, decoded) => {
            if(error) return res.status(401).json({ message: 'Unable to verify the token'});

            const { id } = decoded;

            if(id !== userId) return res.status(403).json({ message: 'Not allowed to updated that user with given user id'});

            const db = getDbConnection('react-auth-db');
            const result = db.collection('users').findOneAndUpdate(
                { _id: ObjectID(id) },
                { $set: { info: updates }},
                { returnOriginal: false },
            );

            const { email, isVerified, info } = result;

            jwt.sign({ id, email, isVerified, info }, process.env.JWT_SECRET, { expiresIn: '1d', }, (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({ token });
            });
        });
    },
};