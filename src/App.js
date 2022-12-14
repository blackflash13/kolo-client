import "./App.css";
import Map from "./components/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm.tsx"

export default function App() {
    return (<       >
            {/*<LoginForm/>*/}

            <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCITAJ4iMfdDK9t5nRIdBTgHwXBZi_KT40.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />

        < />
    );
}
