package com.example.chat.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * Used for testing purposes only.
 */
@RestController
public class TestController {

    @GetMapping(value = "/username")
    public String getUsername(Principal principal){
            return principal.getName();
    }

}
