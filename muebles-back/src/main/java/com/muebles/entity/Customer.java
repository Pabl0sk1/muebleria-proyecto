package com.muebles.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="customers")
public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_customer;
	
	@NotNull @NotEmpty
	@Size(max=50)
	private String name;
	
	@Size(max=50)
	private String lastname;
	
	@Size(max=15)
	private String phone;
	
	@Size(max=30)
	@Email
	private String email;
	
	public Customer() {
		// TODO Auto-generated constructor stub
	}
	
	public Customer(Integer id_customer) {
		super();
		this.id_customer = id_customer;
	}

	public Customer(Integer id_customer, String name, String lastname, String phone, String email) {
		super();
		this.id_customer = id_customer;
		this.name = name;
		this.lastname = lastname;
		this.phone = phone;
		this.email = email;
	}

	public Integer getId_customer() {
		return id_customer;
	}

	public void setId_customer(Integer id_customer) {
		this.id_customer = id_customer;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Customer [id_customer=" + id_customer + ", name=" + name + ", lastname=" + lastname + ", phone=" + phone
				+ ", email=" + email + "]";
	}

}
