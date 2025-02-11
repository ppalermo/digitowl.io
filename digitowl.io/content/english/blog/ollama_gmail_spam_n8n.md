+++
title = "A Privacy-First Email Guardian: Building Your Personal Spam Defender"
date = "2025-02-10"
author = "Your Name"
description = "Creating a secure, locally-hosted email monitoring system using n8n and Ollama"
tags = ["automation", "privacy", "email", "n8n", "ollama"]
categories = ["Technical Guides"]
+++

How many times have you clicked "Find messages like this" in Gmail, hoping to clean your inbox from that one persistent marketing campaign? While Gmail's built-in tools are helpful, they often lack the precision and automation capabilities that could make your email management truly effortless.

## The Solution

I've built a privacy-focused email monitor that leverages n8n's automation platform and Ollama's local language model to create a personalized email classification system. The beauty of this setup? It runs entirely on your local machine, ensuring your email content never leaves your network.

## How It Works

The workflow starts with a Gmail connection through OAuth2 - the same secure method you use when logging into apps with your Google account. Once authenticated, it fetches your latest emails (100 at a time) and feeds them through a series of processing steps.

Each email gets transformed into a structured format that Ollama, running the Mistral 7B model locally, can analyze. The AI classifies each message, and based on the classification, automated actions kick in. In this example, spam gets deleted automatically, but that's just scratching the surface of what's possible.

## The Technical Details

The workflow consists of interconnected nodes, each handling a specific task:
1. Gmail fetches messages
2. Code nodes prepare and process the data
3. Ollama analyzes the content
4. Decision nodes trigger actions

Here's the complete workflow configuration:
![n8n Workflow Diagram](/images/ollama_gmail_workflow.png)

You can download the complete n8n workflow configuration here:
[Download Workflow JSON](/downloads/ollama_gmail_workflow.json) {.btn .btn-primary}

** End of post **
