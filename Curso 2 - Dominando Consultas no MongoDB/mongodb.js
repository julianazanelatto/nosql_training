
use sample_supplies;

show collections;

db.sales.findOne();

db.sales.find({"items.tags": {$in:['office']}}).count()

db.sales.find({ $and: [ { "items.tags": { $in: ['office'] } }, { "items.quantity": { $gte: 4 } }] }).count()

db.sales.find({ $and: [ { "items.tags": { $in: ['office'] }}, {$or: [{"customer.gender":'M'},{"customer.age": {$gte:40}} ] }] }).count()
3894


db.accounts.find({"products":  {$elemMatch: {$in:['Derivatives']}}})

db.accounts.find({"products": {$in:['Derivatives']}})

