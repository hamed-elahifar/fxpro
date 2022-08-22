console.log('Development config loaded...')

module.exports = {
    PORT:                       3000,
    welcomeMessage:             "FxPro [Development] running on port",

    "DB_connectionString":      "mongodb://127.0.0.1/fxpro",
    "DB_debug":                 false,
    "DB_onSuccess":             "Connected to mongoDB server",
    "DB_onError":               "Could NOT connect to mongoDB server",

    "jwt_token":                "8TF(m98^&N6t(f7nM9",
    "jwt_ttl":                  6048000  // 7 days
}
