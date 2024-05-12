module "Users" {
    source = "../../infra/users"
    environment = "${var.environment}"
    admin_id = "${var.admin_id}"
    admin_email = "${var.admin_email}"
    admin_password = "${var.admin_password}"
    admin_name = "${var.admin_name}"
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