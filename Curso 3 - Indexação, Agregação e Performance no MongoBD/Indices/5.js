db.getCollection("listingsAndReviews").findOne({})

db.listingsAndReviews.explain('executionStats').find({
    $and:[
        {"property_type" : "House"},
        {"bedrooms" : {$gt:1}},
        {"bedrooms" : {$lte:3}},
        {"number_of_reviews" : {$gte:10}},
        {"amenities": {$elemMatch: {$eq:"wifi"}}}
    ]
    
})

db.listingsAndReviews.find().count()

db.listingsAndReviews.getIndexes()