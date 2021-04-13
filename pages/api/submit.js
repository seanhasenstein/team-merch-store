import connectToMongoDB from '../../middleware/database';
import Order from '../../models/order';
import { products } from '../../data/index';

export default async (req, res) => {
  await connectToMongoDB();
  const data = JSON.parse(req.body);
  const { firstName, lastName, student, email, phone, orderItems } = data;

  // 1. loop over order to calc orderItems and orderTotal
  const order = orderItems.map(i => {
    const product = products.find(p => p.id === i.productId);
    const sku = product.skus.find(s => s.id === i.skuId);
    const total = sku.price * i.quantity;

    return {
      sku: i.skuId,
      quantity: i.quantity,
      total,
    };
  });

  const orderTotal = order.reduce((acc, currVal) => {
    return currVal.total + acc;
  }, 0);

  // 2. create the order
  const createdOrder = await Order.create({
    firstName,
    lastName,
    student,
    email,
    phone,
    orderItems: order,
    orderTotal,
  });

  // 3. if success => send confirmation email to user (mailgun?) [should I do this from another api route after success res?]
  // 4. send res with order back to client
  res.statusCode = 200;
  res.end(JSON.stringify({ order: createdOrder, success: true }));
  // 5. add error handling
};
