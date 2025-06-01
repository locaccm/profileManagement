module "service_account_profilemanagement-service" {
  source       = "./modules/service_account"
  account_id   = "profilemanagement-service"
  display_name = "Profile Management Service Account"
  project_id   = "intricate-pad-455413-f7"
  roles        = [
    "roles/cloudsql.client",
    "roles/secretmanager.secretAccessor"
  ]
}