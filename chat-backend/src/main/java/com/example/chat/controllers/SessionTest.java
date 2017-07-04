package com.example.chat.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller used in a unit test to check if the session is stored accordingly by using the redis store
 */
@RestController
public class SessionTest {

    @RequestMapping("/")
    public String helloWorld() {
        return "app first response";
    }
}
