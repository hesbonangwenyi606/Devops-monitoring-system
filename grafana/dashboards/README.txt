### Grafana Dashboards

This directory contains Grafana dashboard JSON files used for automatic provisioning when the Grafana container starts.

## Purpose

Grafana automatically loads any dashboard JSON files placed in this folder when the container is launched.
This allows you to version-control and automatically deploy dashboards as part of your monitoring stack.

## Folder Structure
grafana/
└── dashboards/
    ├── sample-dashboard.json
    └── (add more dashboards here)

## How It Works

On container startup, Grafana scans this directory.

Any JSON file containing a valid dashboard definition (with a "title") will be automatically imported.

Dashboards are linked to Prometheus as a data source (configured in datasources.yml).

## Default Login Credentials

Grafana web interface runs at http://localhost:3000

**Field	Default Value**
Username	admin
Password	admin

After your first login, Grafana will ask you to set a new password for security.

If you want to override these defaults automatically (for local setups or CI/CD), you can set environment variables in your docker-compose.yml:

grafana:
  image: grafana/grafana:latest
  environment:
    - GF_SECURITY_ADMIN_USER=admin
    - GF_SECURITY_ADMIN_PASSWORD=admin
  ports:
    - "3000:3000"
  volumes:
    - ./grafana/dashboards:/var/lib/grafana/dashboards
    - ./grafana/provisioning:/etc/grafana/provisioning

## Adding a New Dashboard

Export a dashboard from Grafana UI:
Dashboard settings → JSON model → Copy JSON

Save it inside this folder (e.g., cpu-metrics.json)

## Restart Grafana:

docker restart devops-monitoring-platform-grafana-1


Grafana will automatically import it at startup.

## Import Example Dashboards via Grafana UI

You can import ready-made Prometheus dashboards directly:

Open Grafana → Dashboards → Import

Enter one of these IDs:

1860 — Node Exporter Full (Linux server metrics)

3662 — Prometheus 2.0 Overview

Click Load, select your Prometheus data source, and click Import

## Troubleshooting

If you see:

Dashboard title cannot be empty


→ Ensure your JSON file includes:

{
  "dashboard": {
    "title": "My Dashboard",
    ...
  }
}