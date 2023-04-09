import { CallbackWithoutResultAndOptionalError, Model, Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  password: string;
  email: string;
}

// Put all user instance methods in this interface:
interface IUserMethods {
  createJWT(): string;
}

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, {}, IUserMethods>;

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: [true, 'Please provide name.'], minlength: 3, maxlength: 10 },
  password: { type: String, required: [true, 'Please provide password.'], minlength: 8 },
  email: {
    type: String,
    required: [true, 'Please provide email id.'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email id.'],
    minlength: 5,
    unique: true,
  },
});

//Always use function syntax instead of arrow. It scoped to the document level and 'this.password' will be accessible inside the function.
userSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError) {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);

  next();
});

userSchema.methods.createJWT = function () {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT Secret Key is missing!');
  }

  return sign({ userId: this.id, name: this.name, email: this.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

// 3. Create a Model.
export const UserModel = model<IUser, UserModel>('User', userSchema);
