resource "aws_dynamodb_table" "users" {
  name = "${var.environment}-users"
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }
  
    write_capacity = "${var.write_capacity}"
    read_capacity = "${var.read_capacity}"

    attribute {
        name = "email"
        type = "S"
    }

    global_secondary_index {
        name = "${var.environment}-email-gsi"
        hash_key = "email"
        projection_type = "ALL"
        write_capacity = "${var.write_capacity}"
        read_capacity = "${var.read_capacity}"
    }
}

resource "aws_dynamodb_table_item" "admin" {
    table_name = "${aws_dynamodb_table.users.name}"
    hash_key   = "${aws_dynamodb_table.users.hash_key}"

  item = <<ITEM
    {
      "id": {"S": "${var.admin_id}"},
      "email": {"S":  "${var.admin_email}"},
      "password": {"S": "${var.admin_password}"},
      "role": {"S": "ADMIN"},
      "name": {"S":  "${var.admin_name}"}
    }
ITEM
}

resource "aws_ssm_parameter" "email_gsi" {
    name ="${var.environment}-email-gsi"
    type = "String"
    value = "${var.environment}-email-gsi"
}

resource "aws_ssm_parameter" "aws_dynamodb_users_table" {
    name = "${var.environment}-dynamodb-users-table"
    type = "String"
    value = "${aws_dynamodb_table.users.name}"
}