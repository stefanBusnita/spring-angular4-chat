package com.example.chat.springConfig.security;

import com.example.chat.springConfig.filters.CORSFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.savedrequest.NullRequestCache;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;
import org.springframework.session.web.http.HttpSessionStrategy;

/**
 * Security config
 * Leverage in memory authentication atm.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CORSFilter corsFilter;

    @Bean
    public HttpSessionStrategy httpSessionStrategy() {
        return new HeaderHttpSessionStrategy();
    }

    @Autowired
    private RestAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("admin").password("password").roles("ADMIN,USER").and().withUser("stef").password("password").roles("USER");
    }

    /**
     * Actual security configuration
     * @param http
     */
    @Override
    protected void configure(HttpSecurity http) {
        try {
            http.csrf().disable().httpBasic()
                    .and().authorizeRequests().antMatchers("/**").hasAnyRole("ADMIN,USER").anyRequest().authenticated()
                    .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED).and()
                    .requestCache() //prevent creation of session when user is not Authenticated, we will have only Authenticated session ids in Reddis
                    .requestCache(new NullRequestCache())
            .and().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
    }

}
