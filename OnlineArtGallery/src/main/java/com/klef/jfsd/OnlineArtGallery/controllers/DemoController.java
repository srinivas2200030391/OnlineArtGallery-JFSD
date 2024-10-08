package com.klef.jfsd.OnlineArtGallery.controllers;

import com.klef.jfsd.OnlineArtGallery.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
public class DemoController {

    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public String getHello(){
        return "Hello World";
    }
    public void getHello1(){
        System.out.println("Hello World");
    }

    @PostMapping("/signin")
    public Map<String, Object> signIn(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        Map<String, Object> authenticatedUser = userService.authenticateUser(username, password);
        if (authenticatedUser != null) {
            return authenticatedUser;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
