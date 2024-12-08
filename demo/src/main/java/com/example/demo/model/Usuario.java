package com.example.demo.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Esto debe coincidir con el campo 'id' en la base de datos

    @Column(name = "username", unique = true, nullable = false)
    private String username;  // Asegúrate de que 'username' sea único en la base de datos

    @Column(name = "password", nullable = false)
    private String password;  // La contraseña debe ser encriptada antes de ser guardada

    @Column(name = "email", unique = true, nullable = false)
    private String email;  // El correo debe ser único

    @ManyToOne(fetch = FetchType.EAGER)  // Relación con 'Role'
    @JoinColumn(name = "roles_id", referencedColumnName = "id")  // 'roles_id' es el nombre de la columna en la base de datos
    private Role role;  // Un usuario tiene un rol

    // Getters
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    // Constructor adicional para simplificar pruebas
    public Usuario(String username, String password, String email, Role role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }
}