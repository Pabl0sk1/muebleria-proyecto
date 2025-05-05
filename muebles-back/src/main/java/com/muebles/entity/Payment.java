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
@Table(name="payments")
public class Payment {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id_payment;
	
	@NotNull
	@NotEmpty
	@Size(max=50)
	private String payment;
	
	public Payment() {
		// TODO Auto-generated constructor stub
	}

	public Payment(Integer id_payment) {
		super();
		this.id_payment = id_payment;
	}

	public Payment(Integer id_payment, String payment) {
		super();
		this.id_payment = id_payment;
		this.payment = payment;
	}

	public Integer getId_payment() {
		return id_payment;
	}

	public void setId_payment(Integer id_payment) {
		this.id_payment = id_payment;
	}

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
	}

	@Override
	public String toString() {
		return "Payment [id_payment=" + id_payment + ", payment=" + payment + "]";
	}
	
}
