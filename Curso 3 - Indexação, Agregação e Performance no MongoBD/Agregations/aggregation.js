db.getCollection("sales").find({}).limit(1)

// piline de um único stage
db.sales.aggregate(
    [
        {
            $match:
            {
               // "items.tags": {$elemMatch: {$eq: 'office'}}
               "storeLocation": "Denver"
            }
        }
    ]
)

// pipeline com dois stages

db.sales.aggregate(
    [
        {
            $match:
            {
               // "items.tags": {$elemMatch: {$eq: 'office'}}
               "storeLocation": "Denver"
            }
        },
        {
            $group:
            {
                _id:"$couponUsed",
                "totalCoupom": {
                    $count:{}
                }
            }
        }
    ]
)

db.sales.aggregate(
    [
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        storeLocation: "Denver",
        saleDate: {
          $gte: new ISODate("2017-01-01"),
        },
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        customer: true,
        purchaseMethod: 1,
        items: 1,
      },
  },
  {
    $sort:
      /**
       * Provide any number of field/order pairs.
       */
      {
        "customer.age": 1,
        "customer.satisfaction": -1,
        // "customer.gender": -1
      },
  }
]
)
