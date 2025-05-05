package com.muebles.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.muebles.entity.User;
import com.muebles.repository.UserRepository;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@Service
public class UserService {

	@Autowired
	UserRepository ur;
	
	ValidatorFactory factory=Validation.buildDefaultValidatorFactory();
	Validator validator=factory.getValidator();
	
	public List<User> listar(){
		List<User> result=new ArrayList<User>();
		
		ur.findAll().forEach(result::add);
		
		return result;
	}
	
	public User buscarPorId(Integer id) {
		
		Optional<User> user=ur.findById(id);
		
		if(user.isPresent()) {
			return user.get();
		}else {
			throw new RuntimeException("No se encontro el usuario con ID: " + id);
		}
		
	}
	
	public User guardar(User user) {
		Set<ConstraintViolation<User>> violations=validator.validate(user);
		
		String errorValidation="";
		for(ConstraintViolation<User> cv:violations) {
			errorValidation+="Error "+cv.getPropertyPath()+" "+cv.getMessage();
		}
		
		if(!violations.isEmpty()) {
			throw new RuntimeException(errorValidation);
		}
		
		return ur.save(user);
	}
	
	public void eliminar(Integer id) {
		ur.deleteById(id);
	}
	
	public List<User> buscarPorNombrePaginado(String name, Pageable pegeable){
		
		return ur.findByNameLikeIgnoreCase(name, pegeable);
	}
	
	public List<User> buscarPorEmail(String email){
		
		return ur.findByEmailLikeIgnoreCase(email);
	}
	
	public List<User> buscarPorIdRol(Integer idRole){
		
		return ur.findByIdRole(idRole);
	}
	
}
