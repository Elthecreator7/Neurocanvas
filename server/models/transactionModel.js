import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    tx_ref: {type: String, required: true, unique: true},
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    credits: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    paymentStatus: {type: String, required: true, default: "Pending" },
    date: { type: Number },
})

const transactionModel = mongoose.models.transaction || mongoose.model("transaction", transactionSchema)

export default transactionModel;