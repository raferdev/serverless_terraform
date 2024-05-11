variable environment {
  description = "The environment in which the resources will be created"
  type        = string
  default     = "dev"
}

variable list {
  description = "The list of items to be created"
  type        = list(string)
  default     = ["item1", "item2", "item3"]
}

variable map {
  description = "The map of items to be created"
  type        = map(string)
  default     = {
    key1 = "value1"
    key2 = "value2"
    key3 = "value3"
  }
}