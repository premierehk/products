import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  type: String,
  time: Date,
});

const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema);

export default async function handler(req, res) {
  await dbConnect();
  const result = new Result(req.body);
  await result.save();
  res.status(201).json({ message: 'Saved' });
}
