package com.muebles.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.muebles.entity.Type;

public interface TypeRepository extends CrudRepository<Type, Integer>, PagingAndSortingRepository<Type, Integer>{
	
}
