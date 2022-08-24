import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";


import Api from "../api";

const spinnerStyle = {
    color: "blue",
    width: "250px",
    height: "250px"
}

function Map() {
    const [activeMarker, setActiveMarker] = useState(null);
    const [pos, setMarkers] = useState([]);

    const [isLoading, setIsLoading] = useState(false)


    const getData = async() => {
        await Api.getAllLocations().then(data => {
            setMarkers(data)
        })
    };

    useEffect(() => {
        setIsLoading(true);

        async function call() {
            await getData();
        }


        call() /*.then(() => userPosition());*/
        setTimeout(() => {
            setIsLoading(false)
        }, 300)

    }, []);


    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        pos.map((value) => {
            bounds.extend(value.position)
        });
        map.fitBounds(bounds);
    };


    return ( <
        >
        {
            isLoading ? < div className = "vh-100 d-flex justify-content-center align-items-center" >
            <
            div className = "spinner-border"
            role = "status"
            style = { spinnerStyle } >

            <
            /div> < /
            div > : <
                GoogleMap
            onLoad = { handleOnLoad }
            onClick = {
                () => setActiveMarker(null)
            }
            mapContainerStyle = {
                { width: "100vw", height: "100vh" }
            } > {
                pos.map(({ id, name, description, position }) => ( <
                    MarkerF key = { id }
                    position = { position }
                    onClick = {
                        () => handleActiveMarker(id)
                    } > {
                        activeMarker === id ? ( <
                            InfoWindowF onCloseClick = {
                                () => setActiveMarker(null)
                            } >
                            <
                            div >
                            <
                            h5 > { name } < /h5> <
                            p > { description } < /p> < /
                            div > <
                            /InfoWindowF>
                        ) : null
                    } <
                    /MarkerF>
                ))
            } <
            /GoogleMap>
        } <
        />
    );
}

export default Map;