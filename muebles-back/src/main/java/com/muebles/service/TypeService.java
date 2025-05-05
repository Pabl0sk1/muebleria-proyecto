package com.muebles.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muebles.entity.Type;
import com.muebles.repository.TypeRepository;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@Service
public class TypeService {

	@Autowired
	TypeRepository tr;
	
	ValidatorFactory factory=Validation.buildDefaultValidatorFactory();
	Validator validator=factory.getValidator();
	
	public List<Type> listar(){
		List<Type> result=new ArrayList<Type>();
		
		tr.findAll().forEach(result::add);
		
		return result;
	}
	
	public Type buscarPorId(Integer id) {
		
		Optional<Type> type=tr.findById(id);
		
		if(type.isPresent()) {
			return type.get();
		}else {
			throw new RuntimeException("No se encontro el tipo con ID: " + id);
		}
		
	}
	
	public Type guardar(Type type) {
		Set<ConstraintViolation<Type>> violations=validator.validate(type);
		
		String errorValidation="";
		for(ConstraintViolation<Type> cv:violations) {
			errorValidation+="Error "+cv.getPropertyPath()+" "+cv.getMessage();
		}
		
		if(!violations.isEmpty()) {
			throw new RuntimeException(errorValidation);
		}
		
		return tr.save(type);
	}
	
	
	public void eliminar(Integer id) {
		tr.deleteById(id);
	}

}
