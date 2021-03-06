package com.dovepot.dovepotWeb.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.dovepot.dovepotWeb.models.User;
import com.dovepot.dovepotWeb.repositories.UserRepository;
import com.dovepot.dovepotWeb.secruity.JwtUserDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    String password = encoder.encode(user.getPassword());
    return new JwtUserDetails(user.getId(), user.getUsername(), password, "user");
  }

}
