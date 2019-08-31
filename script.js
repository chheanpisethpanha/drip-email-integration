const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());

//access to drip
const client = require('drip-nodejs')(
    {
        token: "",
        accountId: "" 
    }
    );

/* Handle post request from the form*/
app.post('/', urlencodedParser, function(req, res) {
    res.sendStatus(200)
    
    //data from form website form
    var name = req.body.data.Name
    var property = req.body.data.Property
    var email = req.body.data['E-mail']
    var phone = req.body.data.Phone
    var date = req.body.data.Date
    var bed_info = req.body.data['Bed count and type']
    var transportation = req.body.data['Transportation needed']
    var amount = req.body.data['Amount (in $)']
    console.log(req.body.data)

    //drip functions and parameters
    const campaignId = 946580178;
    const payload = {
        subscribers: [{
            email: email,
            custom_fields:{
                name : name,
                property_type : property,
                phone : phone,
                booking_date : date,
                bed_count_type : bed_info,
                transportation : transportation,
                amount : amount
            }
        }]
    };
    //Function to subscribe email to the automated email campaign
    client.subscribeToCampaign(campaignId, payload)
    .then((response) => {
        console.log(response.body.subscribers);
    })
    .catch((error) => {
        console.log(error);
    });
});

//running on port 3000
app.listen(port, () => console.log('Running on port 3000'));





