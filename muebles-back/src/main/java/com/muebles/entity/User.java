package com.muebles.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_user;
	
	@NotNull @NotEmpty
	@Size(max=50)
	private String name;
	
	@Email
	@Size(max=30)
	private String email;
	
	@Size(max=15)
	private String phone;
	
	@NotNull @NotEmpty @NotBlank
	@Size(max=30)
	private String password;
	
	@ManyToOne
	@NotNull
	@JoinColumn(name="id_role")
	private Role role;
	
	public User() {
		// TODO Auto-generated constructor stub
	}
	
	public User(Integer id_user) {
		super();
		this.id_user = id_user;
	}

	public User(Integer id_user, String name, String email, String phone, String password, Role role) {
		super();
		this.id_user = id_user;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.role = role;
	}

	public Integer getId_user() {
		return id_user;
	}

	public void setId_user(Integer id_user) {
		this.id_user = id_user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "User [id_user=" + id_user + ", name=" + name + ", email=" + email + ", phone=" + phone + ", password="
				+ password + ", role=" + role + "]";
	}
	
}
