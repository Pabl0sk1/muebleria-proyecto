package com.muebles.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="sales")
public class Sale {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id_sale;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	private LocalDate date;
	
	private Integer total;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_customer")
	private Customer customer;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_user")
	private User user;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name="id_payment")
	private Payment payment;
	
	@OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<SaleDetail> saledetail;
	
	public Sale() {
		// TODO Auto-generated constructor stub
	}
	
	public Sale(Integer id_sale) {
		super();
		this.id_sale = id_sale;
	}

	public Sale(Integer id_sale, LocalDate date, Integer total, Customer customer, User user, Payment payment) {
		super();
		this.id_sale = id_sale;
		this.date = date;
		this.total = total;
		this.customer = customer;
		this.user = user;
		this.payment = payment;
	}

	public Sale(Integer id_sale, LocalDate date, Integer total, Customer customer, User user, Payment payment, List<SaleDetail> saledetail) {
		super();
		this.id_sale = id_sale;
		this.date = date;
		this.total = total;
		this.customer = customer;
		this.user = user;
		this.payment = payment;
		this.saledetail = saledetail;
	}

	public Integer getId_sale() {
		return id_sale;
	}

	public void setId_sale(Integer id_sale) {
		this.id_sale = id_sale;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public List<SaleDetail> getSaledetail() {
		return saledetail;
	}

	public void setSaledetail(List<SaleDetail> saledetail) {
		this.saledetail = saledetail;
	}

	@Override
	public String toString() {
		return "Sale [id_sale=" + id_sale + ", date=" + date + ", total=" + total + ", customer=" + customer + ", user="
				+ user + ", payment=" + payment + ", saledetail=" + saledetail + "]";
	}
	
}
