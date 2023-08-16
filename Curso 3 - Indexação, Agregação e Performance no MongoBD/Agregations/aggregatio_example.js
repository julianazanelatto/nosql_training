db.getCollection('sales').aggregate(
  [
    // first stage
    {
      $match: {
        storeLocation: 'Denver',
        saleDate: { $gte: ISODate('2017-01-01T00:00:00.000Z')}
      }
    },
    // second stage
    {
      $project: {
        customer: true,
        purchaseMethod: 1,
        items: 1
      }
    },
    // third stage
    {
      $sort: {
        'customer.age': 1,
        'customer.satisfaction': -1
      }
    },
    //fourth stage
    {
      $group: {
        _id: '$customer.gender',
        'Total gender': { $count: {} }
      }
    }
  ],
  // aggregate options 
  { maxTimeMS: 60000, allowDiskUse: true }
);