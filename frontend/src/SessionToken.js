const accountDetails = {
  _id: "", // also "id": req.body.id,
  password: "", // also "name": req.body.name,
  dob: "", // also "price": req.body.price,
  coins: 0, // all fresh accounts start with 500 coins
  credit_card_num: "", // credit card information is not initally saved
  credit_card_name: "",
  credit_card_zip: "",
  credit_card_cvv: "",
};

export default accountDetails;
