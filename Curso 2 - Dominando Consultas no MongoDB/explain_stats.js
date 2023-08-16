// db.getCollection("shipwrecks").find({})

db.shipwrecks.explain('executionStats').find(
    {
        coordinates:
        {   
            $near:
                {
                    $geometry:
                        {
                            // type: "Point",        
                            coordinates: [ -79.9081268, 9.3547792]
                        },
                        // $minDistance: 1000,
                        $maxDistance: 1000
                }
         }
    }
)