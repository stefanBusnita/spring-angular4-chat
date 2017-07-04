package com.example.chat.springConfig.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Security config
 * Leverage in memory authentication atm.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private com.example.chat.springConfig.filters.CORSFilter CORSFilter;

    @Autowired
    private RestAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("admin").password("password").roles("ADMIN,USER").and().withUser("stef").password("password").roles("USER");
    }

    @Override
    protected void configure(HttpSecurity http) {
        try {
            http
                    .authorizeRequests().antMatchers("/").hasRole("ADMIN").anyRequest().authenticated()
            .and().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
            //.and().addFilterBefore(CORSFilter, UsernamePasswordAuthenticationFilter.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
