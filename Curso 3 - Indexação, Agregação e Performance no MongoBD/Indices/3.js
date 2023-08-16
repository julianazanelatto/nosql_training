db.shipwrecks.getIndexes()

db.getCollection("shipwrecks").find({})

db.shipwrecks.createIndex({"latdec": 1}, { expireAfterSeconds: 1})

db.shipwrecks.dropIndex({"latdec": 1})

