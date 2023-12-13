package com.example.GeoByte.controller;

import com.example.GeoByte.model.Location;
import com.example.GeoByte.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("locations")
public class LocationController {
    @Autowired
    LocationService locationService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Location>> getAllLocations(){
        List<Location> locationList = locationService.getAllLocations();
        return new ResponseEntity<List<Location>>(locationList, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Location> getLocation(@PathVariable Long id){
        Location location = locationService.getLocation(id);
        return new ResponseEntity<Location>(location, HttpStatus.OK);
    }
}
