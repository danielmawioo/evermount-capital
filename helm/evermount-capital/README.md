# Evermount Capital Helm chart

Next.js frontend for Kubernetes. Production traffic still ships on Vercel;
this chart is for cluster deploys of the same Docker image.

## Probes and metrics

| Path | Use |
| --- | --- |
| `GET /api/health` | Liveness |
| `GET /api/ready` | Readiness |
| `GET /api/metrics` | Prometheus gauges (`evermount_up`, `evermount_uptime_ms`) |

## Install

```bash
helm lint ./helm/evermount-capital
helm upgrade --install evermount ./helm/evermount-capital \
  --set image.tag=1.0.0 \
  --set image.digest=sha256:<digest>
```

`NEXT_PUBLIC_*` must be baked into the image at `docker compose build` time.
Runtime secrets (`OPENAI_API_KEY`, `SENTRY_DSN`) belong in a Kubernetes
Secret named by `envFromSecret`.

CI (`Infra validate`) runs `helm lint`, `helm template`, kubeconform,
Checkov, Hadolint, and `docker compose config`. Use
`values-ci.yaml` only as the lint fixture.

## Values (subset)

| Key | Default | Meaning |
| --- | --- | --- |
| `image.digest` | `""` | If set, image is `repository@digest` instead of `:tag` |
| `securityContext.readOnlyRootFilesystem` | `true` | `/tmp` and `/app/.next/cache` are emptyDir |
| `serviceAccount.automount` | `false` | No API token unless you opt in |
| `metrics.serviceMonitor.enabled` | `false` | Prometheus Operator scrape of `/api/metrics` |
| `networkPolicy.enabled` | `false` | Ingress to container port; egress allowed |
| `ingress.tls` | `[]` | TLS secrets for the Ingress |
