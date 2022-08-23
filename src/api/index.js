import axios from "axios";

export default class Api {
    static async getAllLocations() {
        let obj = [];
        const {data} = await axios.get('http://localhost:80/api/location/all', {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmNhZDVkZWM1OTU2MzQxMDIxZDFlYyIsImlhdCI6MTY2MDcyNzE1OX0.vJyByPmbD3Y9ZIrN15tLfwUf1BgOBSx1aBlWpWSuh8Y`
            }
        })

        data.map(val => {
            obj.push({
                id: val.id,
                name: val.title,
                description: val.description,
                position: {
                    lat: val.latitude,
                    lng: val.longitude
                }

            })
        })

        return obj;
    }

}
