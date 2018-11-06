import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.saveData = this.saveData.bind(this);
  }

//  name: { type: String, required: true },
// type: { type: String, required: true },
// address: { type: String, required: true },
// city: { type: String, required: true }, // we provide this?
// state: { type: String, required: true }, // we provide this?
// zipcode: { type: String, required: true, default: '' }, // we provide this?
// position : we provide this


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

  saveData() {
    console.log('here');
    var name = escape(document.getElementById('name').value);
    var address = escape(document.getElementById('address').value);
    var type = document.getElementById('typeOfPlace').value;
    var latlng = this.state.activeMarker.getPosition();
    var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
              '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();
    console.log(name, address, type);
    // downloadUrl(url, function(data, responseCode) {

    //   if (responseCode == 200 && data.length <= 1) {
    //     this.infowindow.close();
    //     this.messagewindow.open(this.map, this.marker);
    //   }
    // });
  }

  //   this.infowindow = new google.maps.InfoWindow({
  //     content: document.getElementById('form')
  //   });

  //   this.messagewindow = new google.maps.InfoWindow({
  //     content: document.getElementById('message')
  //   });



  // }

// callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       console.log((results[i]));
//     }
//   }
// }

  render() {
    let marker;
    if (this.state.activeMarker) {
      // make some markers appear
      marker = <Marker onClick={(props, marker, e) => this.onMarkerClick(props, marker, e)}
          name={'Current location'} position={this.state.activeMarker.position}/>
    }

    let form;
    if (this.state.showingInfoWindow) {
      form = 
      <div id="form">
        <table>
          <tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>
          <tr><td>Address:</td> <td><input type='text' id='address'/> </td> </tr>
          <tr><td>Type of Place:</td> <td><input type='text' id='typeOfPlace'/> </td> </tr>
          <tr><td></td><td><button onClick={this.saveData}></button>
            <input type='button' value='Save' onClick={() => {
            console.log('bleh');
            this.saveData()}}/></td></tr>
        </table>
      </div>
    }

    const style = {
        width: '500px',
        height: '500px'
    }

    let success = <div id="message">Location saved</div>;

    return (
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
          visible={this.state.showingInfoWindow}>
            {form}
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(connect()(MapContainer))