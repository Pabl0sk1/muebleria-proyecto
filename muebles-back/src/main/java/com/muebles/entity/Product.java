package com.muebles.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_product;
	
	@NotNull @NotEmpty
	@Size(max=50)
	private String name;
	
	@Min(0)
	private Integer stock;
	
	@Min(0)
	private Integer price;
	
	@ManyToOne
	@NotNull
	@JoinColumn(name="id_type")
	private Type type;
	
	public Product() {
		// TODO Auto-generated constructor stub
	}
	
	public Product(Integer id_product) {
		super();
		this.id_product = id_product;
	}

	public Product(Integer id_product, String name, Integer stock, Integer price, Type type) {
		super();
		this.id_product = id_product;
		this.name = name;
		this.stock = stock;
		this.price = price;
		this.type = type;
	}

	public Integer getId_product() {
		return id_product;
	}

	public void setId_product(Integer id_product) {
		this.id_product = id_product;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "Product [id_product=" + id_product + ", name=" + name + ", stock=" + stock + ", price=" + price
				+ ", type=" + type + "]";
	}
	
}
