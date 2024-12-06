package com.klef.jfsd.loginservice.repositories;

import com.klef.jfsd.loginservice.models.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepo extends JpaRepository<Artist, Integer> {
    Artist findArtistByUsername(String artist); // Update the method parameter name
}