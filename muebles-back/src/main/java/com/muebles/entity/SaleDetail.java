package com.muebles.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="saledetails")
public class SaleDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_saledetail;
	
	@Min(1)
	private Integer quantity;
	
	private Integer subtotal;
	
	@NotNull
	@JoinColumn(name="id_sale")
	@ManyToOne
	@JsonBackReference
	private Sale sale;
	
	@NotNull
	@JoinColumn(name="id_product")
	@ManyToOne
	private Product product;
	
	public SaleDetail() {
		// TODO Auto-generated constructor stub
	}
	
	public SaleDetail(Integer id_saledetail) {
		super();
		this.id_saledetail = id_saledetail;
	}

	public SaleDetail(Integer id_saledetail, Integer quantity, Integer subtotal, Sale sale, Product product) {
		super();
		this.id_saledetail = id_saledetail;
		this.quantity = quantity;
		this.subtotal = subtotal;
		this.sale = sale;
		this.product = product;
	}

	public Integer getId_saledetail() {
		return id_saledetail;
	}

	public void setId_saledetail(Integer id_saledetail) {
		this.id_saledetail = id_saledetail;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(Integer subtotal) {
		this.subtotal = subtotal;
	}

	public Sale getSale() {
		return sale;
	}

	public void setSale(Sale sale) {
		this.sale = sale;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	@Override
	public String toString() {
		return "SaleDetail [id_saledetail=" + id_saledetail + ", quantity=" + quantity + ", subtotal=" + subtotal
				+ ", sale=" + sale + ", product=" + product + "]";
	}
	
}
