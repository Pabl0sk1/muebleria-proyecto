package com.muebles.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.muebles.entity.Product;
import com.muebles.repository.ProductRepository;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@Service
public class ProductService {

	@Autowired
	ProductRepository pr;
	
	ValidatorFactory factory=Validation.buildDefaultValidatorFactory();
	Validator validator=factory.getValidator();
	
	public List<Product> listar(){
		List<Product> result=new ArrayList<Product>();
		
		pr.findAll().forEach(result::add);
		
		return result;
	}
	
	public Product buscarPorId(Integer id) {
		
		Optional<Product> product=pr.findById(id);
		
		if(product.isPresent()) {
			return product.get();
		}else {
			throw new RuntimeException("No se encontro el producto con ID: " + id);
		}
		
	}
	
	public Product guardar(Product product) {
		Set<ConstraintViolation<Product>> violations=validator.validate(product);
		
		String errorValidation="";
		for(ConstraintViolation<Product> cv:violations) {
			errorValidation+="Error "+cv.getPropertyPath()+" "+cv.getMessage();
		}
		
		if(!violations.isEmpty()) {
			throw new RuntimeException(errorValidation);
		}
		return pr.save(product);
	}
	
	public void eliminar(Integer id) {
		pr.deleteById(id);
	}
	
	public List<Product> buscarPorProductoPaginado(String name, Pageable pageable){
		
		return pr.findByNameLikeIgnoreCase(name, pageable);
	}
	
	public List<Product> buscarPorStock(Integer stock){
		
		return pr.findByStockGreaterThanEqual(stock);
	}
	
	public List<Product> buscarPorIdTipo(Integer idType){
		
		return pr.findByIdType(idType);
	}
}
