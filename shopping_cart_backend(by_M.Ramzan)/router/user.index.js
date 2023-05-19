let express = require("express");
let router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
let cardsChekingscheme = require("../models/buiedBook")
require("dotenv").config();


router.post("/buyBook", async (req, res) => {
    try {
        let {data} = req.body
        let line_items = data.map((val,ind)=>{
            return{       
              price_data: {
                currency: "usd",
                product_data: {
                  name: val.name,
                  description: val.email,
                },
                unit_amount: val.price * 100,
              },
              quantity: val.quantity,
            }
        })
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          // Success URL
          success_url: `http://localhost:3200/user/success?data=${JSON.stringify(data)}`,
          // Cancel URL
          cancel_url: "http://localhost:3200/user/cancel",
        });
        // Send the session URL as the response
        const sessionUrl = session.url;
        return res.json({ sessionUrl }); // Send the session URL as the response
    } catch (error) {
      return res.json({ msg: error.message });
    }
  });

router.get("/success", async (req, res) => {
    try {         
        const rawData = req.query.data;
        const data = JSON.parse(decodeURIComponent(rawData));

        const books = data.map((item) => ({
            name: item.name,
            email: item.email,
            price: item.price,
            quantity: item.quantity,
            paymentStatus: "success"
          }));
      
          // Save all book instances in the database
          await cardsChekingscheme.insertMany(books);

      return res.json({ msg: "Payment successfully completed" });
    } catch (error) {
      res.json({ msg: error.message });
    }
  });
router.get("/cancel", async (req, res) => {
    try {
      return res.json({ msg: "Payment cancelled" });
    } catch (error) {
      res.json({ msg: error.message });
    }
  });


module.exports = router;
