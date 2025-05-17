import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { findUserById } from '../services/user.service';
import dotenv from 'dotenv';
import { IUser } from '../models/user.model';

dotenv.config();

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || 'default_secret_key',
};

passport.use(
	new JwtStrategy(
		options,
		async (
			payload: { id: string },
			done: (arg0: unknown, arg1: boolean | IUser) => any
		) => {
			try {
				const user = await findUserById(payload.id);
				if (user) {
					return done(null, user);
				}
				return done(null, false);
			} catch (error) {
				return done(error, false);
			}
		}
	)
);

export default passport;
