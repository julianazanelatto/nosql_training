db.getCollection('sales').aggregate(
  [
    {
      $project: {
        'items.name': 1,
        'items.price': 1,
        'items.quantity': 1,
        storeLocation: 1
      }
    },
    { $unwind: { path: '$items' } },
    {
      $addFields: {
        totalAmmount: {
          $multiply: [
            '$items.price',
            '$items.quantity'
          ]
        }
      }
    },
    {
      $group: {
        _id: '$storeLocation',
        total: { $sum: '$totalAmmount' }
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);