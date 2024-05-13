module "users" {
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

module "bookings" {
    source = "../../infra/bookings"
    environment = "${var.environment}"
   
    sns_notifications_arn = "${module.notifications.notifications_topic_arn}"
    
    write_capacity = 1
    read_capacity = 1
}

module "notifications" {
    source = "../../notifications"
    environment = "${var.environment}"
  
}