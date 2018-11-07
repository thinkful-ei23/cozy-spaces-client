import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { fetchPlaceInfo, postPlace } from '../actions/places';
import { Redirect } from 'react-router-dom';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }


  onMapClicked(mapProps, map, clickEvent) {
    const latitude = clickEvent.latLng.lat();
    const longitude = clickEvent.latLng.lng();
    console.log(latitude, longitude);
    console.log(this.state);
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
    this.setState({activeMarker: {position: {lat: latitude, lng: longitude}}})
    // this might not be exactly right
    console.log(this.state);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
 

  fetchPlaces(mapProps, map) {
    console.log('will be fetching places from our db???');
    //<Listing places={this.state.places} />
    // const {google} = mapProps;
    // const service = new google.maps.places.PlacesService(map);
    // ...
  }

  onInfoWindowOpen(props, e) {
    const form = (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name"></input> 
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type='text' id='address'></input> 
      </div>
      <div>
        <label htmlFor="typeOfPlace">Type of Place:</label>
        <input type='text' id='typeOfPlace'></input> 
      </div>
      <button value='Save' onClick={e => this.saveData(e)}>Add listing</button>
    </form>);
    ReactDOM.render(React.Children.only(form), document.getElementById("form"));
  }

  saveData(e) {
    e.preventDefault();
    let name = escape(document.getElementById('name').value);
    let address = escape(document.getElementById('address').value);
    let type = document.getElementById('typeOfPlace').value;
    let lat = this.state.activeMarker.internalPosition.lat();
    let lng = this.state.activeMarker.internalPosition.lng();
    return this.props.dispatch(fetchPlaceInfo(lat, lng)).then(info => {
      const place = {
        name,
        type,
        address,
        city: info.address_components[1].long_name,
        state: info.address_components[3].long_name,
        zipcode: info.address_components[0].long_name,
        position: {lat, lng}
      }
      console.log(place);
      return this.props.dispatch(postPlace(place));
    });

  }

  render() {
    if (this.props.specificPlace) {
      return <Redirect to={`/places/${this.props.specificPlace._id}`} />
    }
    let marker;
    if (this.state.activeMarker) {
      // make some markers appear
      marker = <Marker onClick={(props, marker, e) => this.onMarkerClick(props, marker, e)}
          name={'Current location'} position={this.state.activeMarker.position}/>
    }

    const style = {
        width: '500px',
        height: '500px'
    };

    return (
      <div>
      <Map google={this.props.google}
      style={style}
      initialCenter={{
        lat: 45.6387281,
        lng: -122.6614861
      }}
      zoom={15}
      onReady={this.fetchPlaces}
      onClick={(mapProps, map, clickEvent) => this.onMapClicked(mapProps, map, clickEvent)}>
        {marker}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onOpen={e => {
            this.onInfoWindowOpen(this.props, e);
          }}
          >
          <div id="form" />
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  info: state.places.info,
  specificPlace: state.places.specificPlace
});

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(connect(mapStateToProps)(MapContainer))