package com.example.GeoByte.service;

import com.example.GeoByte.model.Location;
import com.example.GeoByte.repo.LocationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    LocationRepo locationRepo;

    public List<Location> getAllLocations(){
        return locationRepo.findAll();
    }

    public Location getLocation(Long id){
        return locationRepo.findById(id).orElse(null);
    }

    public Location createLocation(Location location){
        return locationRepo.save(location);
    }

    public Location updateLocation(Location location){
        return locationRepo.save(location);
    }

    public void deleteLocation(Long id){
        locationRepo.deleteById(id);
    }
}
