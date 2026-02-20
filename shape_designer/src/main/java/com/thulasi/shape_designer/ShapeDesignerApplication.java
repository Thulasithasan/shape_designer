package com.thulasi.shape_designer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ShapeDesignerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShapeDesignerApplication.class, args);
	}

}
