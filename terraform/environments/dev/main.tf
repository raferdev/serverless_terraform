module "Users" {
    source = "../../infra/users"
    environment = "${var.environment}"
    write_capacity = 1
    read_capacity = 1
    jwt_secret = "${var.jwt_secret}"
}

module "Bookings" {
    source = "../../infra/bookings"
    environment = "${var.environment}"
    write_capacity = 1
    read_capacity = 1
}