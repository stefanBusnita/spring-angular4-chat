package com.example.chat.customAnnotations;

import org.springframework.beans.factory.annotation.Qualifier;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by Stefan on 06.07.2017.
 * Shows the implementation type that should be injected, classified as with logging, without logging
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD,
        ElementType.TYPE, ElementType.PARAMETER})
@Qualifier
public @interface Logging   {
    LOGGING_STATUS status();
    enum LOGGING_STATUS {
        NONE, ACTIVE
    }

}
