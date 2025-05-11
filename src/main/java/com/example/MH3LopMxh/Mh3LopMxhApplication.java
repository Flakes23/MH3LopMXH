package com.example.MH3LopMxh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "*") // Cho phép tất cả
@SpringBootApplication
public class Mh3LopMxhApplication {
    public static void main(String[] args) {
            SpringApplication.run(Mh3LopMxhApplication.class, args);  
    }

}
