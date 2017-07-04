package com.example.chat.springConfig.security;

import com.example.chat.springConfig.filters.CORSFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

/**
 * Security config
 * Leverage in memory authentication atm.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CORSFilter corsFilter;

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
            //httpBasic().and()
            http.csrf().disable().httpBasic().and().logout().invalidateHttpSession(true).clearAuthentication(true).deleteCookies("SESSIONID").logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK)).and()
                    .authorizeRequests().antMatchers("/").hasRole("ADMIN").anyRequest().authenticated()
                    .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED);
            //.and().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
            //.and().addFilterBefore(CORSFilter, UsernamePasswordAuthenticationFilter.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
