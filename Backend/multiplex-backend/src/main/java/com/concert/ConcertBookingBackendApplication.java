package com.concert;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.concert.utils.FileUploadProperties;

@SpringBootApplication
@EnableConfigurationProperties({
    FileUploadProperties.class
})
public class ConcertBookingBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConcertBookingBackendApplication.class, args);
	}

}
