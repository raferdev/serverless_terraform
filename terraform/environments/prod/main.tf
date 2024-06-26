data "aws_caller_identity" "current" {}

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
    account_id = "${data.aws_caller_identity.current.account_id}"
    region = "${var.region}"
}

module "system" {
    source = "../../infra/systems"
    environment = "${var.environment}"
    email_from = "${var.email_from}"
    email_from_password = "${var.email_from_password}"
    email_to = "${var.email_to}"
    smtp_server = "${var.smtp_server}"
    sms_phone_from = "${var.sms_phone_from}"
    sms_phone_to = "${var.sms_phone_to}"
    twilio_api_key = "${var.twilio_api_key}"
    twilio_account = "${var.twilio_account}"
}