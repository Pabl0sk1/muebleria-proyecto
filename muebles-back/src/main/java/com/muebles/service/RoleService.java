package com.muebles.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muebles.entity.Role;
import com.muebles.repository.RoleRepository;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@Service
public class RoleService {

	@Autowired
	RoleRepository rr;
	
	ValidatorFactory factory=Validation.buildDefaultValidatorFactory();
	Validator validator=factory.getValidator();
	
	public List<Role> listar(){
		List<Role> result=new ArrayList<Role>();
		
		rr.findAll().forEach(result::add);
		
		return result;
	}
	
	public Role buscarPorId(Integer id) {
		
		Optional<Role> role=rr.findById(id);
		
		if(role.isPresent()) {
			return role.get();
		}else {
			throw new RuntimeException("No se encontro el rol con ID: " + id);
		}
		
	}
	
	public Role guardar(Role role) {
		Set<ConstraintViolation<Role>> violations=validator.validate(role);
		
		String errorValidation="";
		for(ConstraintViolation<Role> cv:violations) {
			errorValidation+="Error "+cv.getPropertyPath()+" "+cv.getMessage();
		}
		
		if(!violations.isEmpty()) {
			throw new RuntimeException(errorValidation);
		}
		return rr.save(role);
	}
	
	public void eliminar(Integer id) {
		rr.deleteById(id);
	}

}
