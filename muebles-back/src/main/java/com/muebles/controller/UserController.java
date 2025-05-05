package com.muebles.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.muebles.entity.User;
import com.muebles.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping(path="usuario")
@CrossOrigin(origins="http://localhost:5173/", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserController {
	
	@Autowired
	UserService us;
	
	@GetMapping(path="listar")
	public Map<String, Object> listar() {
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", us.listar().size());
		result.put("list", us.listar());
		
		return result;
	}
	
	@GetMapping(path="buscar/{id}")
	public Map<String, Object> buscarPorId(@PathVariable Integer id){
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("user", us.buscarPorId(id));
		
		return map;
	}
	
	@GetMapping(path="buscarPorNombrePaginado")
	public Map<String, Object> buscarPorNombrePaginado(@RequestParam(required = false) String q, Pageable pageable){
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", us.buscarPorNombrePaginado("%" + q + "%", pageable).size());
		result.put("list", us.buscarPorNombrePaginado("%" + q + "%", pageable));
		
		return result;
	}
	
	@GetMapping(path="buscarPorEmail")
	public Map<String, Object> buscarPorEmail(@RequestParam(required = false) String q){
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", us.buscarPorEmail("%"+q+"%").size());
		result.put("list", us.buscarPorEmail("%"+q+"%"));
		
		return result;
	}
	
	@GetMapping(path="buscarPorIdRol")
	public Map<String, Object> buscarPorIdRol(@RequestParam(required = false) Integer q){
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", us.buscarPorIdRol(q).size());
		result.put("list", us.buscarPorIdRol(q));
		
		return result;
	}
	
	@PostMapping(path="guardar")
	public Map<String, Object> guardar(@RequestBody User user) {
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		map.put("added", us.guardar(user));
		
		return map;
	}
	
	@DeleteMapping(path="eliminar/{id}")
	public Map<String, Object> eliminar(@PathVariable Integer id) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		int sw=0;
		
		for(User u:us.listar()) {
			if(u.getId_user()==id) {
				sw=1;
				break;
			}
		}
		
		if(sw==1) {
			us.eliminar(id);
			map.put("message", "Registro de ID "+id+" de usuario eliminado.");
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
	@PutMapping(path="modificar/{id}")
	public Map<String, Object> modificar(@PathVariable Integer id, @RequestBody User user) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		User existingUser=us.buscarPorId(id);
		
		if(existingUser!=null) {
			user.setId_user(id);
			map.put("modify", us.guardar(user));
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
}
