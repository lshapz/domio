1) redo database so it only tracks required info [ ​id, type, dynamicDisplayPrice, basePrice, datetime of price]

2) add "update" method that updates the database for changed info instead of just adding rows 

3) add a follow up to update method that calls the email service as requested 

    * Apartments: Notify whenever the ​dynamicDisplayPrice​ is l​ ess​ than the ​basePrice
    * Homes: Notify whenever the d​ ynamicDisplayPrice​ is ​more​ than the ​basePrice
