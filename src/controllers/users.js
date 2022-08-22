const router = require("express").Router(),
  Joi = require("joi"),
  auth = require("../middleware/auth");
fs = require("fs");

const data = require("../../user-collection.json");

router.get("/fetch-all-users", async (req, res, next) => {
  res.payload = data;

  return next();
});

router.get("/distinct-users", async (req, res, next) => {
  const result = {};

  for (let item of data) {
    // let count = result[item]?.country || 1;
    let count = result[item.country] || 1;

    if (count == 1) {
      Object.assign(result, {
        [item.country]: 1,
      });
    }

    if (result[item.country] >= 1) {
      result[item.country] = result[item.country] + 1;
    }
  }

  res.payload = result;

  return next();
});

router.post("/add-user", async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    earnings: Joi.string().required(),
    country: Joi.string().required(),
    name: Joi.string().required(),
  });
  const { error: joiErr } = schema.validate(req.body, { abortEarly: false });
  if (joiErr)
    return next({ status: 400, msg: joiErr.details.map((x) => x.message) });

  const { id, earnings, country, name } = req.body;

  data.push({ id, earnings, country, name });

  res.payload = { id, earnings, country, name };

  fs.writeFileSync("./user-collection.json", JSON.stringify(data), "utf8");

  return next();
});



module.exports = router;
