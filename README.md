# shopping-app
Full CI_CD implementation on simple shopping webapp using tools like docker, EKS, Jenkins, Prometheus,Grafana, Terraform


Minimal shopping web-app (React frontend + Node backend) with Kubernetes deployment and CI/CD blueprint.

Features:
- React frontend
- Node/Express backend with Prometheus metrics
- Dockerfiles for frontend & backend
- Kubernetes manifests (Deployments, Services, Ingress)
- Monitoring via kube-prometheus-stack (Prometheus + Grafana) + ServiceMonitor
- Terraform skeleton to provision AWS infra: VPC, EKS (module), ECR, RDS (Postgres)
- Jenkinsfile implementing CI/CD: build → push → deploy

How to use:
1. Update placeholders in terraform/ and k8s/ files.
2. Run `terraform init && terraform apply`.
3. Build/push initial images to ECR or let Jenkins build them.
4. Configure kubeconfig: `aws eks update-kubeconfig --name <EKS_CLUSTER_NAME> --region <AWS_REGION>`.
5. `kubectl apply -f k8s/base/ && kubectl apply -f k8s/ingress/`
6. Install monitoring: helm install kube-prometheus-stack and apply ServiceMonitor.
7. Configure Jenkins credentials and create pipeline pointing to `jenkins/Jenkinsfile`.

See folder README sections for details.
