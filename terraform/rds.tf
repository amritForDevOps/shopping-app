resource "random_password" "db" {
  length  = 16
  special = true
}

resource "aws_db_subnet_group" "default" {
  name       = "${var.cluster_name}-db-subnet-group"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_security_group" "rds_sg" {
  name        = "${var.cluster_name}-rds-sg"
  description = "Allow Postgres to EKS"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block]
    description = "Allow Postgres access "
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }
}

resource "aws_db_instance" "postgres" {
  identifier          = "${var.cluster_name}-postgres-db"
  allocated_storage   = 20
  engine              = "postgres"
  engine_version      = "15.7"
  instance_class      = "db.t3.micro"
  db_name             = "shoppingdb"
  username            = "shopingadmin"
  password            = var.db_password != "" ? var.db_password : random_password.db.result
  skip_final_snapshot = true
  publicly_accessible = false
  multi_az            = false
}
