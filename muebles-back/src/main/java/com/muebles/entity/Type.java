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
@Table(name="types")
public class Type {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_type;
	
	@NotNull @NotEmpty
	@Size(max=50)
	private String type;
		
	public Type() {
		// TODO Auto-generated constructor stub
	}
	
	public Type(Integer id_type) {
		super();
		this.id_type = id_type;
	}
	
	public Type(Integer id_type, String type) {
		super();
		this.id_type = id_type;
		this.type = type;
	}

	public Integer getId_type() {
		return id_type;
	}

	public void setId_type(Integer id_type) {
		this.id_type = id_type;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "Type [id_type=" + id_type + ", type=" + type + "]";
	}
	
}
