package com.muebles.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.muebles.entity.Role;

public interface RoleRepository extends CrudRepository<Role, Integer>, PagingAndSortingRepository<Role, Integer>{

}
