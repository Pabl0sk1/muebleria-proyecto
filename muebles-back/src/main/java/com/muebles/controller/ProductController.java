package com.muebles.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.muebles.entity.Product;
import com.muebles.service.ProductService;

@RestController
@RequestMapping(path="producto")
@CrossOrigin(origins="http://localhost:5173/", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ProductController {

	@Autowired
	ProductService ps;
	
	@GetMapping(path="listar")
	public Map<String, Object> listar() {
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", ps.listar().size());
		result.put("list", ps.listar());
		
		return result;
	}
	
	@GetMapping(path="buscar/{id}")
	public Map<String, Object> buscarPorId(@PathVariable Integer id){
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("product", ps.buscarPorId(id));
		
		return map;
	}
	
	@GetMapping(path="buscarPorProductoPaginado")
	public Map<String, Object> buscarPorProductoPaginado(@RequestParam(required = false) String q, Pageable pageable){
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", ps.buscarPorProductoPaginado("%" + q + "%", pageable).size());
		result.put("list", ps.buscarPorProductoPaginado("%" + q + "%", pageable));
		
		return result;
	}
	
	@GetMapping(path="buscarPorStock")
	public Map<String, Object> buscarPorStock(@RequestParam(required = false) Integer q){
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", ps.buscarPorStock(q).size());
		result.put("list", ps.buscarPorStock(q));
		
		return result;
	}
	
	@GetMapping(path="buscarPorIdTipo")
	public Map<String, Object> buscarPorIdTipo(@RequestParam(required = false) Integer q){
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", ps.buscarPorIdTipo(q).size());
		result.put("list", ps.buscarPorIdTipo(q));
		
		return result;
	}
	
	@PostMapping(path="guardar")
	public Map<String, Object> guardar(@RequestBody Product product) {
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		map.put("added", ps.guardar(product));
		
		return map;
	}
	
	@DeleteMapping(path="eliminar/{id}")
	public Map<String, Object> eliminar(@PathVariable Integer id) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		int sw=0;
		
		for(Product p:ps.listar()) {
			if(p.getId_product()==id) {
				sw=1;
				break;
			}
		}
		
		if(sw==1) {
			ps.eliminar(id);
			map.put("message", "Registro de ID "+id+" de producto eliminado.");
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
	@PutMapping(path="modificar/{id}")
	public Map<String, Object> modificar(@PathVariable Integer id, @RequestBody Product product) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		Product existingProduct=ps.buscarPorId(id);
		
		if(existingProduct!=null) {
			product.setId_product(id);
			map.put("modify", ps.guardar(product));
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
}
