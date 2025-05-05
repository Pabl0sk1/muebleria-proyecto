package com.muebles.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.muebles.entity.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Integer>, PagingAndSortingRepository<Customer, Integer>{

	List<Customer> findByNameLikeIgnoreCaseOrLastnameLikeIgnoreCase(String name, String lastname, Pageable pageable);
	
	List<Customer> findByEmailLikeIgnoreCase(String email);
	
	List<Customer> findByPhoneLike(String phone);
}
