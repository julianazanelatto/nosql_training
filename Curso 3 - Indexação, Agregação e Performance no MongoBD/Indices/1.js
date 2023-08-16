db.shipwrecks.getIndexes()

db.shipwrecks.dropIndex("coordinates_2dsphere");

db.shipwrecks.createIndex({"coordinates": "2dsphere"})

db.shipwrecks.explain("executionStats").find({"latdec" : {$lte: 2.0}})


db.shipwrecks.find( {
            $and: 
                [
                    {"latdec" : {$lte: 2.0}},
                    {"londec": {$lte: -7}}
                ]
})

db.shipwrecks.explain("executionStats").find( {
            $and: 
                [
                    {"londec" : {$lte: 2.0}},
                    {"londec": {$gte: -7}}
                ]
})