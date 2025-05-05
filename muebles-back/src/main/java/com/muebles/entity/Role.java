package com.muebles.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="roles")
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_role;
	
	@NotNull @NotEmpty
	@Size(max=50)
	private String role;
	
	public Role() {
		// TODO Auto-generated constructor stub
	}
	
	public Role(Integer id_role) {
		super();
		this.id_role = id_role;
	}

	public Role(Integer id_role, String role) {
		super();
		this.id_role = id_role;
		this.role = role;
	}

	public Integer getId_role() {
		return id_role;
	}

	public void setId_role(Integer id_role) {
		this.id_role = id_role;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "Role [id_role=" + id_role + ", role=" + role + "]";
	}
	
}
