package com.example.demo.service;


import com.example.demo.model.Role;
import com.example.demo.controller.AuthController.RegisterRequest;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.security.JwtTokenProvider;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    public String authenticateUser(String username, String password) {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
    
        return jwtTokenProvider.generateToken(username);
    }


    public void registerUser(RegisterRequest registerRequest) {
        if (usuarioRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya existe");
        }

        if (usuarioRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("El correo electrónico ya está registrado");
        }

        if (registerRequest.getRole() == null || registerRequest.getRole().isEmpty()) {
            throw new RuntimeException("El rol no puede ser nulo o vacío");
        }

        Role role = roleRepository.findByNombre(registerRequest.getRole())
                .orElseThrow(() -> new RuntimeException("El rol no existe"));

        Usuario usuario = new Usuario(
                registerRequest.getUsername(),
                passwordEncoder.encode(registerRequest.getPassword()), // Encripta la contraseña
                registerRequest.getEmail(),
                role
        );

        usuarioRepository.save(usuario);
    }


}
