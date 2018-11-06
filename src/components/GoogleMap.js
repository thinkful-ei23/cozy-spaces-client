import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

export class MapContainer extends Component {

  onMapClicked(mapProps, map, clickEvent) {
    console.log('map clicked');
    console.log('mapProps', mapProps);
    console.log('map:', map);
    console.log('clickEvent', clickEvent)
    console.log('latitude', clickEvent.latLng.lat())
    console.log('longitude', clickEvent.latLng.lng())
    // need to open a form that lets users input information
  }

  fetchPlaces(mapProps, map) {
    console.log('will be fetching places from our db???');
    //<Listing places={this.state.places} />
    // const {google} = mapProps;
    // const service = new google.maps.places.PlacesService(map);
    // ...
  }

  render() {
    const style = {
        width: '500px',
        height: '500px'
      }

    return (
      <Map google={this.props.google}
      style={style}
      initialCenter={{
        lat: 45.6387281,
        lng: -122.6614861
      }}
      zoom={15}
      onReady={this.fetchPlaces}
      onClick={this.onMapClicked}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        {/* <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)