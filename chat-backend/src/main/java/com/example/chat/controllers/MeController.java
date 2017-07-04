package com.example.chat.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

/**
 *
 */
@RestController
public class MeController {

    @Autowired
    ObjectMapper om;

    /**
     * Should go away on cleanup.
     * @param authentication
     * @return
     */
    @GetMapping(value = "/username")
    public String getUsername(Authentication authentication){
        boolean name = Optional.ofNullable(authentication).isPresent();
            return name==true ?  "{\"success\":1}":  "{\"success\":0}";
    }

    /**
     * Should go away on cleanup.
     * @param request
     * @param response
     */
    @GetMapping(value="/logout")
    public void logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }

    }

}
