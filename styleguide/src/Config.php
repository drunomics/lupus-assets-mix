<?php

namespace drunomics\Styleguide;

class Config {

  public function __construct($config_file) {
    if (!file_exists($config_file)) {
      throw new \Exception('Config::construct(): Given config file "' . $config_file . '" does not exist.');
    }

    $config = $this->parseYaml($config_file);

    if ($config === FALSE) {
      throw new \Exception('Config::construct(): Error parsing config file "' . $config_file . '".');
    }

    $this->_config = [];
    $this->setConfig($config);
  }

  public function parseYaml($file) {
    $yaml = new \Symfony\Component\Yaml\Parser();
    return $yaml->parse(file_get_contents($file));
  }

  public function setConfig($update) {
    $this->_config = $update + $this->_config;
  }

  public function set($property, $value) {
    if (!$property) {
      throw new \Exception('Config::set(): Trying to set empty config property.');
    }
    $this->_config[$property] = $value;
  }

  public function get($property) {
    return isset($this->_config[$property]) ? $this->_config[$property] : NULL;
  }
}
