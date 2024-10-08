package com.klef.jfsd.OnlineArtGallery.services;

import com.klef.jfsd.OnlineArtGallery.models.Admin;
import com.klef.jfsd.OnlineArtGallery.models.ArtWork;
import com.klef.jfsd.OnlineArtGallery.repositories.AdminRepo;
import com.klef.jfsd.OnlineArtGallery.repositories.ArtWorkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Adminservice {

    @Autowired
    AdminRepo repo;
    ArtWorkRepo artrepo;
    // Method to manage artworks
    public void manageArtworks() {
        // Implementation for managing artworks
        System.out.println("Managing artworks...");
    }

    // Method to manage users
    public void manageUsers() {
        // Implementation for managing users
        System.out.println("Managing users...");
    }

    // Method to view reports
    public void viewReports() {
        // Implementation for viewing reports
        System.out.println("Viewing reports...");
    }

    // Example method to get all admins
    public List<Admin> getAllAdmins() {
       return repo.findAll();
    }

    // Example method to add a new admin
    public void addAdmin(Admin admin) {
       repo.save(admin);
    }

    // Example method to delete an admin by ID
    public void deleteAdmin(Integer id) {
       repo.deleteById(id);
    }
    public void addArt(ArtWork art) {
        artrepo.save(art);
    }
}