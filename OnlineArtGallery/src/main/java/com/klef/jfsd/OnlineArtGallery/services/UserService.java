package com.klef.jfsd.OnlineArtGallery.services;

import com.klef.jfsd.OnlineArtGallery.models.*;
import com.klef.jfsd.OnlineArtGallery.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private CuratorRepo curatorRepo;

    @Autowired
    private VisitorRepo visitorRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ArtistRepo artistRepo;

    public Map<String, Object> authenticateUser(String username, String password) {
        Curator curator = curatorRepo.findCuratorByName(username);
        if (curator != null && curator.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("role", "curator");
            response.put("user", curator);
            return response;
        }

        Visitor visitor = visitorRepo.findVisitorByName(username);
        if (visitor != null && visitor.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("role", "visitor");
            response.put("user", visitor);
            return response;
        }

        Admin admin = adminRepo.findAdminByUsername(username);
        if (admin != null && admin.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("role", "admin");
            response.put("user", admin);
            return response;
        }

        Artist artist = artistRepo.findArtistByUsername(username);
        if (artist != null && artist.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("role", "artist");
            response.put("user", artist);
            return response;
        }

        return null;
    }
}