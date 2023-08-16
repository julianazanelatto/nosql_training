db.shipwrecks.find(
    {
        coordinates:
            {
                $near:
                    {
                        $geometry: {
                            coordinates: [-79.9081268, 9.3547792]
                        },
                        $minDistance: 1000,
                        $maxDistance: 5000
                    }
            }
    }
);


// legacy mongdb
// db.shipwrecks.find({coordinates:{$near:[ -79.9081268, 9.3547792]}})