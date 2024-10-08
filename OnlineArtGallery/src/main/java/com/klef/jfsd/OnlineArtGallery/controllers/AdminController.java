package com.klef.jfsd.OnlineArtGallery.controllers;

import com.klef.jfsd.OnlineArtGallery.models.Admin;
import com.klef.jfsd.OnlineArtGallery.models.ArtWork;
import com.klef.jfsd.OnlineArtGallery.services.Adminservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private Adminservice adminService;

    // Endpoint to manage artworks
    @GetMapping("/manageArtworks")
    public void manageArtworks() {
        adminService.manageArtworks();
    }

    // Endpoint to manage users
    @GetMapping("/manageUsers")
    public void manageUsers() {
        adminService.manageUsers();
    }

    // Endpoint to view reports
    @GetMapping("/viewReports")
    public void viewReports() {
        adminService.viewReports();
    }

    // Endpoint to get all admins
    @GetMapping("/admins")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Endpoint to add a new admin
    @PostMapping("/admins")
    public void addAdmin(@RequestBody Admin admin) {
        adminService.addAdmin(admin);
    }

    // Endpoint to delete an admin by ID
    @DeleteMapping("/admins/{id}")
    public void deleteAdmin(@PathVariable Integer id) {
        adminService.deleteAdmin(id);
    }

    // Endpoint to add a new artwork
    @PostMapping("/artworks")
    public void addArt(@RequestBody ArtWork artWork) {
        adminService.addArt(artWork);
    }
}