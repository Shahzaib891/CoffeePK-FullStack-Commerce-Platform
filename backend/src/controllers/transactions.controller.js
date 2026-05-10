import notification from '../helpers/notification.js';
import db from '../helpers/postgre.js';
import fcmModel from '../models/fcm.model.js';
import transactionsModel from '../models/transactions.model.js';

// ======================================================
// LIST TRANSACTIONS
// ======================================================
async function index(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * perPage;
    const { status_id } = req.query;

    const meta = await transactionsModel.getMetaTransactions(
      { status_id },
      perPage,
      page
    );

    const result = await transactionsModel.getTransactions(
      { status_id },
      perPage,
      offset
    );

    res.status(200).json({
      status: 200,
      msg: "Fetch success",
      meta,
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
    });
  }
}

// ======================================================
// CREATE NEW TRANSACTION (FIXED VERSION WITH promo_id fallback)
// ======================================================
async function store(req, res) {
  const { authInfo, body } = req;

  // ⭐ IMPORTANT FIX — Prevent promo_id foreign key errors ⭐
  body.promo_id = body.promo_id || 1; 
  // If frontend sends undefined, null, 0 → automatically use default promo (ID:1)

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const { payment_id, delivery_id } = body;

    // Insert main transaction record
    const result = await transactionsModel.createTransaction(
      client,
      body,
      authInfo.id
    );

    const transactionId = result.rows[0].id;

    // Insert transaction detail rows
    await transactionsModel.createDetailTransaction(
      client,
      body,
      transactionId
    );

    // Calculate subtotal
    const total = await transactionsModel.grandTotal(client, transactionId);

    // Delivery fee lookup
    const deliveryFee = await client.query(
      `SELECT fee FROM deliveries WHERE id = $1`,
      [delivery_id]
    );

    // Payment fee lookup
    const paymentFee = await client.query(
      `SELECT fee FROM payments WHERE id = $1`,
      [payment_id]
    );

    // Final total calculation
    const grandTotal =
      Number(total) +
      Number(deliveryFee.rows[0].fee) +
      Number(paymentFee.rows[0].fee);

    // Update grand total
    await transactionsModel.updateGrandTotal(client, transactionId, grandTotal);

    // Push notification to admin
    const result_token = await fcmModel.getAdminTokenFcm();
    if (result_token.rows.length > 0) {
      const tokens = result_token.rows.map((obj) => obj.token);

      await notification.send(tokens, {
        title: "New Order Received!",
        body: "Hey dude! A new order came in. Check it out!",
      });
    }

    await client.query("COMMIT");
    client.release();

    res.status(201).json({
      status: 201,
      msg: "Create Transaction Success",
    });

  } catch (err) {
    console.log(err.message);

    await client.query("ROLLBACK");
    client.release();

    res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
    });
  }
}

// ======================================================
// SHOW TRANSACTION DETAIL
// ======================================================
async function show(req, res) {
  try {
    const result = await transactionsModel.show(req);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Data not found" });
    }

    res.status(200).json({
      data: result.rows,
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

// ======================================================
// UPDATE TRANSACTION
// ======================================================
async function update(req, res) {
  try {
    const result = await transactionsModel.update(req);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Data not found" });
    }

    res.status(200).json({
      data: result.rows,
      msg: "Update success",
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

// ======================================================
// DELETE TRANSACTION
// ======================================================
async function destroy(req, res) {
  try {
    const result = await transactionsModel.destroy(req);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Data not found" });
    }

    res.status(200).json({
      data: result.rows,
      msg: "Data was destroyed",
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

// ======================================================
// CHANGE STATUS → DONE
// ======================================================
async function statusDone(req, res) {
  try {
    const { transactions } = req.body;

    const id_array = transactions.split(",").map((item) => item.trim());

    const result = await transactionsModel.changeStatusToDone(id_array);

    const ids = result.rows.map((item) => item.user_id);

    const result_token = await fcmModel.getTokenFcmByUserId(ids);

    if (result_token.rows.length > 0) {
      const tokens = result_token.rows.map((obj) => obj.token);

      await notification.send(tokens, {
        title: "Your order has been processed!",
        body: "Hey coffeeholic, your order is ready! ☕",
      });
    }

    res.status(200).json({
      status: 200,
      msg: "Fetch data success",
      result: result.rows,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
    });
  }
}

export default {
  index,
  show,
  store,
  update,
  destroy,
  statusDone,
};
