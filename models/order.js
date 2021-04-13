import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  student: String,
  email: String,
  phone: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['UNPAID', 'PAID', 'REFUNDED'],
    default: 'UNPAID',
  },
  orderItems: [
    {
      _id: false,
      sku: String,
      quantity: Number,
      total: Number,
    },
  ],
  orderTotal: Number,
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
