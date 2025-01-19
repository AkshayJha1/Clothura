const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const dotenv = require("dotenv")
dotenv.config();
const createPaymentIntent = async (req, res) => {
    const { products } = req.body;

    try {

        const lineItems = products.map((product)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:product.name,
                },
                unit_amount: product.price * 100,
            },
            quantity:product.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: process.env.NODE_ENV === 'development' ? "http://localhost:5173/cart?success=true" : "https://clothura.onrender.com/cart?success=true",
            cancel_url: process.env.NODE_ENV === 'development' ? "http://localhost:5173/cart?canceled=true" : "https://clothura.onrender.com/cart?canceled=true",
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send("Internal Server Error");
    }
};






module.exports = {createPaymentIntent }