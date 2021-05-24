import React, { useState } from 'react';
import MyMap from './MyMap';
import {Button, Select, MenuItem, makeStyles, FormControl, TextField} from '@material-ui/core'
const google_key = process.env.REACT_APP_google_key;

export default function RestaurantFinder () {

  const [geocode, setGeocode] = useState(null);
  const fetchGeocode = () => {
    const url = new URL("https://maps.googleapis.com/maps/api/geocode/json?");
    url.searchParams.append("address", address);
    url.searchParams.append("key", google_key);
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        setGeocode(obj.results[0].geometry.location);
      });
  }

  const [address, setAddress] = useState(null);
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const [type, setType] = useState("restaurant");
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const [keyword, setKeyword] = useState("");
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  }

  const [distance, setDistance] = useState(2000);
  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  }

  if (geocode===null){
    return (
      <div style={{textAlign: "center"}}>
        
        <h1>Restaurant Finder</h1>

        <FormControl className={classes.formControl}>

        <TextField 
          label="Address" 
          variant="outlined" 
          onChange={handleAddressChange}
        />
        
        <p></p>

        <Select
          value={type}
          onChange={handleTypeChange}
          displayEmpty
          variant="outlined" 
        >
          <MenuItem value="" disabled>Type</MenuItem>
          <MenuItem value={"restaurant"}>Restaurant</MenuItem>
          <MenuItem value={"bar"}>Bar</MenuItem>
          <MenuItem value={"cafe"}>Cafe</MenuItem>
        </Select>

        <TextField 
          label="Keyword" 
          variant="outlined" 
          onChange={handleKeywordChange}
        />

        <TextField
          label="Distance"
          variant="outlined" 
          type="number"
          onChange={handleDistanceChange}
        />

        <p></p>

        <Button variant="contained" onClick={fetchGeocode}>Go!</Button>

        </FormControl>

      </div>
    )
  }
  else{
    return (
      <div style={{textAlign: "center"}}>
        <h1>Restaurant Finder</h1>
        <MyMap latitude={geocode.lat} longitude={geocode.lng} type={type} keyword={keyword} distance={distance} />
      </div>
    );
  }

}
