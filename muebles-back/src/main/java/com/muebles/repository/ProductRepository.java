package com.muebles.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.muebles.entity.Product;

public interface ProductRepository extends CrudRepository<Product, Integer>, PagingAndSortingRepository<Product, Integer> {

	List<Product> findByNameLikeIgnoreCase(String name, Pageable pageable);
	
	List<Product> findByStockGreaterThanEqual(Integer stock);
	
	@Query("SELECT p FROM Product p WHERE p.type.id_type = ?1")
	List<Product> findByIdType(Integer idType);
	
}
