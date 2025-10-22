resource "aws_ecr_repository" "backend" {
  name                 = "shopping-backend"
  image_tag_mutability = "MUTABLE"
  tags = {
    Project = "${var.cluster_name}"
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "shopping-frontend"
  image_tag_mutability = "MUTABLE"
  tags = {
    Project = "${var.cluster_name}"
  }
}