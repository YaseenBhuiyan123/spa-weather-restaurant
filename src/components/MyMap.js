import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import "./MyMap.css";

const google_key = process.env.REACT_APP_google_key;
const mapbox_key = process.env.REACT_APP_mapbox_key;

export default function MyMap({
  latitude,
  longitude,
  type,
  keyword,
  distance,
}) {
  const [places, setPlaces] = useState(null);

  useEffect(() => {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    );
    url.searchParams.append("key", google_key);
    url.searchParams.append("location", latitude + "," + longitude);
    url.searchParams.append("radius", distance);
    url.searchParams.append("type", type);
    url.searchParams.append("opennow", "true");
    url.searchParams.append("keyword", keyword);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let arr = res.results;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].price_level === undefined) {
            arr.splice(i, 1);
            i = i - 1;
          }
        }
        setPlaces(arr.slice(0, 7));
        console.log(arr.slice(0, 7));
      });
  }, [latitude, longitude]);

  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    width: "100%",
    height: "100%",
    zoom: 14,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  const getDirections = (lat, lng) => {
    window
      .open(
        "https://www.google.com/maps/dir//" +
          lat +
          "," +
          lng +
          "/@" +
          lat +
          "," +
          lng +
          ",17z/data=!4m4!4m3!1m0!1m1!4e1",
        "_blank"
      )
      .focus();
  };

  const [filter, setFilter] = useState("name");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterResults = () => {
    switch (filter) {
      case "name":
        places.sort((a, b) => {
          let x = a.name.toLowerCase();
          let y = b.name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        break;
      case "rating":
        places.sort((a, b) => {
          return b.rating - a.rating;
        });
        break;
      case "price":
        places.sort((a, b) => {
          return b.price_level - a.price_level;
        });
        break;
      default:
        alert("Error: Results Filter Error");
    }
  };

  if (places === null) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          {(() => {
            filterResults();
          })()}
        </p>

        <nav>
          
          <RadioGroup row defaultValue="name">
            <FormControlLabel
              value="name"
              control={<Radio color="primary" />}
              label="Name"
              labelPlacement="top"
              onChange={handleFilterChange}
            />
            <FormControlLabel
              value="rating"
              control={<Radio color="primary" />}
              label="Rating"
              labelPlacement="top"
              onChange={handleFilterChange}
            />
            <FormControlLabel
              value="price"
              control={<Radio color="primary" />}
              label="Price"
              labelPlacement="top"
              onChange={handleFilterChange}
            />
          </RadioGroup>

          <List>
            {places.map((place) => {
              return (
                <ListItem
                  key={place.place_id}
                  button="true"
                  onClick={() => {
                    getDirections(
                      place.geometry.location.lat,
                      place.geometry.location.lng
                    );
                  }}
                >
                  <ListItemText
                    primary={place.name}
                    secondary={
                      "Rating: " +
                      place.rating +
                      ", Price Level: " +
                      place.price_level
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </nav>
        <article>
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={mapbox_key}
            mapStyle="mapbox://styles/yaseenbhuiyan123/ckoxi3i6j11hc17ocs6yk7m7l"
            onViewportChange={(viewport) => {
              setViewport(viewport);
            }}
          >
            {places.map((place) => {
              return (
                <Marker
                  key={place.place_id}
                  latitude={place.geometry.location.lat}
                  longitude={place.geometry.location.lng}
                >
                  <button
                    className="marker-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedMarker(place);
                    }}
                  >
                    <img src="/marker.png" alt="marker" />
                  </button>
                </Marker>
              );
            })}

            {selectedMarker ? (
              <Popup
                latitude={selectedMarker.geometry.location.lat}
                longitude={selectedMarker.geometry.location.lng}
                onClose={() => {
                  setSelectedMarker(null);
                }}
              >
                <div>
                  <h2>{selectedMarker.name}</h2>
                  <p>Rating: {selectedMarker.rating}</p>
                  <p>Price: {selectedMarker.price_level}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      getDirections(
                        selectedMarker.geometry.location.lat,
                        selectedMarker.geometry.location.lng
                      );
                    }}
                  >
                    Directions (HOLD)
                  </button>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
        </article>
      </div>
    );
  }
}

/*
https://www.youtube.com/watch?v=JJatzkPcmoI
*/
