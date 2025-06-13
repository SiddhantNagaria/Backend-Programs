const mongoose = require("mongoose");
const { Schema } = mongoose;

async function main() {
    await mongoose.connect("mongodb://127.0.0.1/Relations_SQL");
}

main()
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch((err) => {
        console.log(err);
    });


const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
})

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// const addCustomer = async () => {
//     let cust1 = new Customer({
//         name: "Siddhant Nagaria",
//     });
//     let order1 = await Order.findOne({ item: "chips" });
//     let order2 = await Order.findOne({ item: "chocolate" });
//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let res = await cust1.save();
//     console.log(res);
// }

// addCustomer();

const find = async()=>{
    let res = await Customer.findOne({name:"Siddhant Nagaria"}).populate("orders");
    console.log(res);
} 


const addCust = async()=>{
    let newCust = new Customer({
        name:"Siddhant",
    });
    let newOrder = new Order({
        item:"doll",
        price:6000
    });
    newCust.orders.push(newOrder);
    await newOrder.save();
    await newCust.save();

    console.log("added new customer");

};

addCust();


const delCust = async()=>{
    let data = await Customer.findByIdAndDelete("683d6fa5791d09ffba1242b3");
    console.log(data);
}

delCust();

find();

// const addOrders = async () => {
//     let res = await Order.insertMany([
//         {
//             item: "chips", price: "20",
//         }, {
//             item: "chocolate", price: "40",
//         }, {
//             item: "toast", price: "5",
//         },
//     ]);
//     console.log(res);
// };

// addOrders();