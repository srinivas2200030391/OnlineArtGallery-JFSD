package com.klef.jfsd.OnlineArtGallery.models;



import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "visitors")
@Component
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String password;

    // Constructors
    public Visitor() {}

    public Visitor(Integer id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Methods for tasks
    public void browseArtworks() {
        // Implementation for browsing artworks
    }

    public void participateInVirtualTours() {
        // Implementation for participating in virtual gallery tours
    }

    public void makePurchase(String artworkId) {
        // Implementation for making purchases
    }
}