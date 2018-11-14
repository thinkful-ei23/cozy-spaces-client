import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchPlaceInfo, postPlace, fetchLatLng } from '../actions/places';
import { Redirect } from 'react-router-dom';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentLocation: {},
      geolocationError: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleLocationError = this.handleLocationError.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => this.setPosition(position),
        () => {
          this.handleLocationError(true);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false);
    }
  }

  setPosition(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    this.setState({ currentLocation: pos, geoLocationError: false });
  }

  handleLocationError(browserHasGeolocation) {
    this.setState({ geolocationError: true });
  }

  onMapClicked(mapProps, map, clickEvent) {
    const latitude = clickEvent.latLng.lat();
    const longitude = clickEvent.latLng.lng();
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
    this.setState({
      activeMarker: { position: { lat: latitude, lng: longitude } }
    });
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  fetchPlaces(mapProps, map) {
    //<Listing places={this.state.places} />
    // const {google} = mapProps;
    // const service = new google.maps.places.PlacesService(map);
    // ...
  }

  onInfoWindowOpen(props, e) {
    const form = (
      <form>
        <div className="topBottomMargin8px">
          <label className="blackText" htmlFor="name">
            Name:
          </label>
          <input type="text" id="name" />
        </div>
        <div className="topBottomMargin8px">
          <label className="blackText" htmlFor="address">
            Address:
          </label>
          <input type="text" id="address" />
        </div>
        <div className="topBottomMargin8px">
          <label className="blackText" htmlFor="typeOfPlace">
            Type of Place:
          </label>
          <input type="text" id="typeOfPlace" />
        </div>
        <button className="button" onClick={e => this.saveData(e)} value="Save">
          Add listing
        </button>
      </form>
    );
    ReactDOM.render(React.Children.only(form), document.getElementById('form'));
  }

  saveData(e) {
    this.setState({ geolocationError: false });
    e.preventDefault();
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let type = document.getElementById('typeOfPlace').value;
    let lat = this.state.activeMarker.internalPosition.lat();
    let lng = this.state.activeMarker.internalPosition.lng();
    return this.props.dispatch(fetchPlaceInfo(lat, lng)).then(info => {
      let state;
      if (info.address_components.length === 5) {
        state = info.address_components[3].long_name;
      } else {
        state = info.address_components[2].long_name;
      }
      const place = {
        name,
        type,
        address,
        city: info.address_components[1].long_name,
        state,
        zipcode: info.address_components[0].long_name,
        location: { type: 'Point', coordinates: [lng, lat] },
        photos: ['444444444444444444444000']
      };
      return this.props.dispatch(postPlace(place));
    });
  }

  sendZip(e) {
    e.preventDefault();
    let zip = document.getElementById('zip-geo').value;
    this.props.dispatch(fetchLatLng(zip)).then(latLng => {
      this.setState({ currentLocation: latLng });
    });
  }

  render() {
    if (this.props.specificPlace) {
      return <Redirect to={`/places/${this.props.specificPlace._id}`} />;
    }

    let marker;
    let geolocationForm;
    let geoLocationError;

    if (this.state.activeMarker) {
      // make some markers appear
      marker = (
        <Marker
          onClick={(props, marker, e) => this.onMarkerClick(props, marker, e)}
          name={'Current location'}
          position={this.state.activeMarker.position}
        />
      );
    }

    if (this.state.geolocationError) {
      geoLocationError = <p>'Error: The Geolocation service failed'</p>;
      // make some markers appear
      geolocationForm = (
        <form>
          <label htmlFor="zip-geo">Enter a zip-code instead</label>
          <input
            id="zip-geo"
            type="text"
            pattern="[0-9]{5}"
            title="Five digit zip code"
          />
          <button onClick={e => this.sendZip(e)}>Submit</button>
        </form>
      );
    }

    const mapWrapper = {
      height: 500,
      width: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      padding: 0
    };

    const style = {
      height: '100%',
      width: '100%',
      margin: '0 auto',
      position: 'static'
    };

    return (
      <section>
        {geoLocationError}
        {geolocationForm}
        <div class='map-container' style={mapWrapper}>
          <Map
            google={this.props.google}
            style={style}
            containerStyle={style}
            initialCenter={{
              lat: 45.6387281,
              lng: -122.6614861
            }}
            center={this.state.currentLocation}
            zoom={12}
            onReady={this.fetchPlaces}
            onClick={(mapProps, map, clickEvent) =>
              this.onMapClicked(mapProps, map, clickEvent)
            }
          >
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
      </section>
    );
  }
}

const mapStateToProps = state => ({
  info: state.places.info,
  specificPlace: state.places.specificPlace
});

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(connect(mapStateToProps)(MapContainer));
