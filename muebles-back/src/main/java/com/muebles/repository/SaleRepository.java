package com.muebles.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.muebles.entity.Sale;

public interface SaleRepository extends CrudRepository<Sale, Integer>, PagingAndSortingRepository<Sale, Integer>{
	
	@Query("SELECT s FROM Sale s WHERE s.date >= ?1")
	List<Sale> findByDate(LocalDate date, Pageable pageable);
	
	@Query("SELECT s FROM Sale s WHERE s.customer.id_customer = :idCustomer")
	List<Sale> findByIdCustomer(Integer idCustomer);

	@Query("SELECT s FROM Sale s WHERE s.user.id_user = ?1")
	List<Sale> findByIdUser(Integer idUser);
	
}
