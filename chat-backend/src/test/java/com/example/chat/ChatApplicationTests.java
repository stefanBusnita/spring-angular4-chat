package com.example.chat;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import redis.clients.jedis.Jedis;

/**
 * Tests for the app.
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {ChatApplication.class},webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ChatApplicationTests {


	@LocalServerPort
	int randomServerPort;

	//Could have chosen Redisson or Lettuce, but we need only a simple client
	private Jedis jedis;
	private TestRestTemplate testRestTemplate;
	private TestRestTemplate authTestRestTemplate;
	private String testUrl= "http://localhost:";

	@Value("${spring.redis.host}")
	private String redisUrl;

	@Value("${spring.redis.port}")
	private String redisPort;


	@Before
	public void beforeTestingSetup(){
		initialize();
		clearWholeRedisStore();
	}

	/**
	 * As before the test starts the Redis Db is cleared
	 * Check if the flush had the desired effect
	 */
	@Test
	public void checkRedisEmpty(){
		Long expected = Long.valueOf(0);
		Assert.assertEquals(expected,jedis.dbSize());
	}

	/**
	 * Testing a secure endpoint with no credentials provided
	 */
	@Test
	public void testUnauthenticatedAccess(){
		ResponseEntity<String> result = testRestTemplate.getForEntity(testUrl+randomServerPort+"/username",String.class);
		Assert.assertEquals(HttpStatus.UNAUTHORIZED,result.getStatusCode());
		System.out.println("--------------------TESTING ENDPOINT WITHOUT AUTHORIZATION COMPLETE---------------------");
	}


	/**
	 * Testing the Basic Authentication contract.
	 * 1. Connect to a secured endpoint
	 * 2. Get returned x-auth-token
	 * 3. Try sending it without the Authorization header ( test token exchange policy )
	 * 4. Check if a redis session is created
	 * 5. Flush the redis session, do another request, check is UNAUTHORIZED IS RETURNED (returned because
	 */
	@Test
	public void testAfterLoginRedisSession(){
		String actualUrl = testUrl+randomServerPort+"/username";

		ResponseEntity<String> result = authTestRestTemplate.withBasicAuth("stef","password").getForEntity(actualUrl,String.class);
		Assert.assertEquals(HttpStatus.OK,result.getStatusCode());
		System.out.println("--------------------TESTING ENDPOINT WITH AUTHORIZATION COMPLETE---------------------");


		Assert.assertTrue(jedis.dbSize()>0);
		System.out.println("--------------------CHECKING REDIS STORE IS NOT EMPTY COMPLETE---------------------");

		System.out.println("The result is the following "+result.getHeaders().toString());
		String token = result.getHeaders().get("x-auth-token").get(0);
		HttpHeaders headers = new HttpHeaders();
		headers.add("x-auth-token",token);
		HttpEntity<String> request = new HttpEntity<>(headers);

		result = testRestTemplate.exchange(actualUrl, HttpMethod.GET,request,String.class);
		Assert.assertEquals("stef",result.getBody());
		System.out.println("--------------------CHECKING ACCESS WITH SESSION IS COMPLETE---------------------");

		jedis.flushAll();
		result = testRestTemplate.exchange(actualUrl, HttpMethod.GET,request,String.class);
		Assert.assertEquals(HttpStatus.UNAUTHORIZED,result.getStatusCode());
		System.out.println("--------------------UNAUTHORIZED SESSION IS GONE TEST IS COMPLETE---------------------");
	}

	/**
	 * Helper function.
	 * Ran before the actual tests starts.
	 * Connect to the Redis DB using a Jedis client
	 * Calls flushAll
	 */
	private final void clearWholeRedisStore(){
		jedis = new Jedis(redisUrl,Integer.parseInt(redisPort));
		jedis.flushAll();
	}

	/**
	 * Helper function.
	 * Ran before the actual tests start
	 */
	private final void initialize(){
		testRestTemplate = new TestRestTemplate();
		authTestRestTemplate = new TestRestTemplate();

	}

}
