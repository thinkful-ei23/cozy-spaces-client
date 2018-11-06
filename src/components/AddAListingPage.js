// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// export class AddAListingPage extends Component {
//     <style type="text/css">
//     #map {
//       height: 100%;
//     }
//     html, body {
//       height: 100%;
//       margin: 0;
//       padding: 0;
//     }
//   </style>

//   var map;

//     function initMap() {
//         var california = {lat: 37.4419, lng: -122.1419};
//         map = new google.maps.Map(document.getElementById('map'), {
//           center: california,
//           zoom: 13
//         });
//     }
//     render(){

//         return (
//             <div id="map" height="460px" width="100%"></div>
//             <div id="form">
//       <table>
//       <tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>
//       <tr><td>Address:</td> <td><input type='text' id='address'/> </td> </tr>
//       <tr><td>Type:</td> <td><select id='type'> +
//                  <option value='bar' SELECTED>bar</option>
//                  <option value='restaurant'>restaurant</option>
//                  </select> </td></tr>
//                  <tr><td></td><td><input type='button' value='Save' onclick='saveData()'/></td></tr>
//       </table>
//     </div>
//         );
//     }
// }

// export default connect()(AddAListingPage);