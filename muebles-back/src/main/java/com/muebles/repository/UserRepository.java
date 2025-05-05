package com.muebles.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.muebles.entity.User;

public interface UserRepository extends CrudRepository<User, Integer>, PagingAndSortingRepository<User, Integer>{
	
	List<User> findByNameLikeIgnoreCase(String name, Pageable pageable);
	
	List<User> findByEmailLikeIgnoreCase(String email);
	
	@Query("SELECT u FROM User u WHERE u.role.id_role = :idRole")
	List<User> findByIdRole(Integer idRole);
	
}
