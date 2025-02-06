---
title: "vLLM Production Stack: Succeed on Kubernetes"
date: 2025-02-06
description: "A look into the new open-source vLLM Production Stack—featuring Helm charts, Grafana, Prometheus, and high-performance LLM serving"
draft: false
---

## Introduction

The **vLLM Production Stack** is a new open-source reference implementation that extends the [vLLM project](https://github.com/vllm-project) into production settings. This stack offers a turnkey way to deploy Large Language Models (LLMs) on Kubernetes or other cloud environments. It brings together the power of [Helm charts](https://helm.sh/), [Grafana](https://grafana.com/), and [Prometheus](https://prometheus.io/) to simplify observability and scaling for multiple LLMs.

In this post, we’ll explore the key features of the vLLM Production Stack and highlight how it addresses real-time monitoring, caching, and performance in production.

---

## Key Features

### 1. Simple Cluster Deployment

- **Helm Charts**: Quickly spin up a fully functional vLLM environment using Helm.
- **Kubernetes & Ray**: Designed for flexible deployment in Kubernetes clusters or Ray clusters.
- **Ease of Use**: Minimal configuration with pre-configured defaults to get you started.

### 2. Observability and Monitoring

- **Real-Time Insights**: Track metrics such as:
  - **Time to First Token** (TTFT)
  - **Time to Better Token** (TBT)
  - **Throughput** (queries per second)
- **Grafana Dashboards**: Pre-built dashboards display metrics for both system and model performance.
- **Prometheus Integration**: Collects metrics from vLLM engines, enabling long-term analysis and alerts.

### 3. Multiple Model Support

- **Drop-in Replacement for OpenAI API**: The router can support many different models simultaneously.
- **vLLM Engines**: Easily run popular LLMs, including Llama, Qwen, Gemma, and Mistral.
- **Prefix-Aware Routing**: Automatically routes queries to nodes containing the relevant context.

### 4. High Performance

- **Lower Response Delay**: Achieve 3–10× lower response latency than comparable solutions.
- **Higher Throughput**: Benefit from 2–5× throughput gains under heavy load.
- **KV Cache Sharing**: Built on LMCache, allowing all model instances to share key-value caches efficiently.

### 5. Autoscaling

- **Horizontal Autoscaling**: Scale your vLLM engines based on real-time metrics such as throughput.
- **HPA/Custom Autoscalers**: Integrate with Kubernetes native Horizontal Pod Autoscaler or external scaling solutions.

---

## Architectural Overview

```text
        +----------+
        |  Router  |
        +-----+----+
              |
 +-------------+--------------+
 |        vLLM Engines        |
 |   (Node1, Node2, Node3)    |
 +-------------+--------------+
               |
               +----------------------------------+
               | Sharded Key-Value Cache (LMCache)|
               +----------------------------------+
               |
       +----------------------+
       | Observability Stack  |
       | (Prometheus, Grafana)|
       +----------------------+
```

## Observability Stack

The observability stack includes:

- Router: Routes incoming requests to the appropriate vLLM engines.
- vLLM Engines: Host multiple models, manage token generation, and share cache states.
- Sharded Key-Value Cache: Maintains partial model context in a distributed manner.
- Observability Stack: Collects performance metrics and aggregates them for dashboards.



Performance Gains
Inter-token Latency (ITL)
By leveraging the efficient vLLM architecture, you’ll see significantly reduced latency per token, especially at higher query rates.

Time to First Token (TTFT)
The TTFT is greatly optimized through caching and parallelization, allowing for a near-instant first token response at scale.

## Getting Started
Repository: https://lnkd.in/dqcH2Cv7
Quick Start Guide: https://lnkd.in/dSQ4uSMZ

- Clone the repo to access the Helm charts and sample configurations.
- Configure your Kubernetes or Ray cluster settings as desired.
Install using Helm:
```bash
helm install vllm-prod-stack ./charts/vllm-prod-stack
```
- Monitor via Prometheus and Grafana dashboards.
- Scale horizontally based on metrics like throughput or concurrency.

## Conclusion

The vLLM Production Stack aims to simplify the journey from prototype to production for Large Language Models. By providing a Kubernetes-native solution with built-in observability and caching, it unlocks high performance and scalability out of the box. Whether you’re building your own internal language model services or looking for a highly optimized drop-in OpenAI API replacement, the vLLM Production Stack offers a streamlined path to success.