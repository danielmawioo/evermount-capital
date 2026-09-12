{{- define "evermount-capital.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "evermount-capital.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{- define "evermount-capital.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "evermount-capital.labels" -}}
helm.sh/chart: {{ include "evermount-capital.chart" . }}
{{ include "evermount-capital.selectorLabels" . }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "evermount-capital.selectorLabels" -}}
app.kubernetes.io/name: {{ include "evermount-capital.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "evermount-capital.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "evermount-capital.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
