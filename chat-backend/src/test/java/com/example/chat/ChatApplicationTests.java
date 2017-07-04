package com.example.chat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * Tests for the app.
 * TODO
 * test connection without authorization
 * test connection with authorization
 * test w/o session
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {ChatApplication.class},webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ChatApplicationTests {

	@LocalServerPort
	int randomServerPort;

	@Test
	public void contextLoads() {
	}

}
