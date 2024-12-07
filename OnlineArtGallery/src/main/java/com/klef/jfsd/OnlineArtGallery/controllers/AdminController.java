package com.klef.jfsd.OnlineArtGallery.controllers;

import com.klef.jfsd.OnlineArtGallery.models.Admin;
import com.klef.jfsd.OnlineArtGallery.models.ArtWork;
import com.klef.jfsd.OnlineArtGallery.models.Artist;
import com.klef.jfsd.OnlineArtGallery.models.Curator;
import com.klef.jfsd.OnlineArtGallery.services.Adminservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private Adminservice adminService;

    // Endpoint to add an artist
    @PostMapping("/artists")
    public void addArtist(@RequestBody Artist artist) {
        adminService.addArtist(artist);
    }

    // Endpoint to add an artwork
    @PostMapping("/artworks")
    public void addArt(@RequestBody ArtWork artWork) {
        adminService.addArt(artWork);
    }

    // Endpoint to remove an artwork
    @DeleteMapping("/artworks/{id}")
    public void removeArt(@PathVariable Integer id) {
        adminService.removeArt(id);
    }

    // Endpoint to add a curator
    @PostMapping("/curators")
    public void addCurator(@RequestBody Curator curator) {
        adminService.addCurator(curator);
    }

    // Endpoint to get all stats
    @GetMapping("/stats")
    public Map<String, Integer> getAllStats() {
        Map<String, Integer> stats = new HashMap<>();
        stats.put("numberOfVisitors", adminService.getNumberOfVisitors());
        stats.put("numberOfArtworks", adminService.getNumberOfArtworks());
        stats.put("numberOfArtists", adminService.getNumberOfArtists());
        stats.put("numberOfCurators", adminService.getNumberOfCurators());
        return stats;
    }
}