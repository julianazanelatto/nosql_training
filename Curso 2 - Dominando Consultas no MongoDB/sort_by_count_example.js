db.getCollection("sales").find({})

db.sales.aggregate(
    [
        {
            $unwind: "$items"
        },
        { 
            $sortByCount:  "$items" 
        }
    ]
)
