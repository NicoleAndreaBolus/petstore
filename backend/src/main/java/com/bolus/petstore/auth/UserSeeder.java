package com.bolus.petstore.auth;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.existsByEmail("admin@petstore.com")) {
            System.out.println("✅ Admin account already exists in database. Skipping.");
            return;
        }

        try {
            System.out.println("👑 Creating default Admin account...");

            User admin = new User();
            // admin.setName("Professor Admin"); // Removed to fix compile error
            admin.setEmail("admin@petstore.com");
            admin.setPassword(passwordEncoder.encode("admin123"));

            userRepository.save(admin);
            System.out.println("✅ Admin account created: admin@petstore.com / admin123");
        } catch (Exception e) {
            System.out.println("⚠️ Could not create default admin account: " + e.getMessage());
        }
    }
}