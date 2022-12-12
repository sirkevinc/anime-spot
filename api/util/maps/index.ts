import { Client } from "@googlemaps/google-maps-services-js"

const client = new Client({});

client.elevation({
    params: {
        locations: [],
        key: process.env.GOOGLE_MAPS_API_KEY || ""
    },
    timeout: 1000
})
.then(res => {
    console.log(res.data.results[0].elevation)
})