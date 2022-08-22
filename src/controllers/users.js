const router = require("express").Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const fs = require("fs");
const _ = require("lodash");

let data = require("../../user-collection.json");
// data = data.map(user => ({}));

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

router.get("/statistics", async (req, res, next) => {
  // 10 top users with highest earnings
  const sortedDATA = _.sortBy(data, "earnings");
  sortedDATA.reverse();

  const topTenUsers = sortedDATA.slice(0, 10);

  const topTenCountries = topTenUsers.map((user) => user.country);

  const finalResult = {};

  for (let item of data) {
    if (topTenCountries.includes(item.country)) {
      item.earnings = parseFloat(item.earnings.replace("$", ""));

      finalResult[item.country] = {
        sum: finalResult[item.country]?.sum
          ? finalResult[item.country].sum + item.earnings
          : item.earnings,
        count: finalResult[item.country]?.count ? finalResult[item.country].count + 1 : 1,
      };
    }
  }

  for (let item of Object.keys(finalResult)) {
    finalResult[item].average = finalResult[item].sum / finalResult[item].count;
  }

  res.payload = finalResult;

  return next();
});

module.exports = router;
