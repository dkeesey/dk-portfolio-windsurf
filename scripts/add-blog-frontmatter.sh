#!/bin/bash

# Script to add frontmatter to AI Development Journey blog posts
set -e

BLOG_DIR="/Users/$(whoami)/Workspace/dk-portfolio-windsurf/src/content/blog"

echo "Adding frontmatter to AI Development Journey blog posts..."

# Function to add frontmatter to a file
add_frontmatter() {
    local file="$1"
    local title="$2"
    local description="$3"
    local date="$4"
    local tags="$5"
    local image="$6"
    local reading_time="$7"
    
    # Create temporary file with frontmatter
    cat > "${file}.tmp" << EOF
---
title: "$title"
description: "$description"
publishDate: $date
tags: [$tags]
image: "$image"
readingTime: $reading_time
author: "Dean Keesey"
---

EOF
    
    # Append original content (skip first line if it's the title)
    tail -n +2 "$file" >> "${file}.tmp"
    
    # Replace original file
    mv "${file}.tmp" "$file"
    
    echo "Updated: $(basename "$file")"
}

# Process each blog post
cd "$BLOG_DIR"

add_frontmatter "01-hardware-foundation.md" \
    "The Hardware Foundation for AI Development" \
    "How the right hardware choices enabled a sophisticated AI development environment with M4 Mac Mini, 64GB RAM, and strategic storage decisions." \
    "2024-12-15" \
    '"ai-development", "hardware", "mac-mini", "development-environment", "memory-bandwidth"' \
    "/images/blog/ai-hardware-foundation.svg" \
    "12"

add_frontmatter "02-security-strategy.md" \
    "Securing Your AI Toolkit: MCP Version Control Strategy" \
    "How security-first thinking shaped my approach to managing AI development tools and MCP server version control." \
    "2024-12-16" \
    '"ai-development", "security", "mcp-servers", "version-control", "development-workflow"' \
    "/images/blog/ai-security-strategy.svg" \
    "10"

add_frontmatter "03-multi-llm-integration.md" \
    "Building Multi-LLM Integration Architecture" \
    "Designing systems that seamlessly work across Claude, GPT-4, and other AI models with consistent interfaces and fallback strategies." \
    "2024-12-17" \
    '"ai-development", "multi-llm", "architecture", "integration", "ai-models"' \
    "/images/blog/ai-multi-llm-integration.svg" \
    "14"

add_frontmatter "04-resilient-memory-systems.md" \
    "Building Resilient Memory Systems for AI Development" \
    "Creating robust memory architectures that persist context across sessions and recover gracefully from failures." \
    "2024-12-18" \
    '"ai-development", "memory-systems", "persistence", "architecture", "resilience"' \
    "/images/blog/ai-resilient-memory-systems.svg" \
    "13"

add_frontmatter "05-meta-prompt-strategy.md" \
    "Meta-Prompt Strategy: Building Self-Improving AI Workflows" \
    "How meta-prompts and self-reflective AI systems can create more intelligent and adaptive development workflows." \
    "2024-12-19" \
    '"ai-development", "meta-prompts", "self-improvement", "workflows", "automation"' \
    "/images/blog/ai-meta-prompt-strategy.svg" \
    "15"

add_frontmatter "06-operational-excellence.md" \
    "Operational Excellence in AI Development" \
    "Monitoring, debugging, and maintaining complex AI development environments with multiple services and dependencies." \
    "2024-12-20" \
    '"ai-development", "operational-excellence", "monitoring", "debugging", "maintenance"' \
    "/images/blog/ai-operational-excellence.svg" \
    "11"

add_frontmatter "00-blog-series-overview.md" \
    "AI Development Journey: Building a Sophisticated Development Environment" \
    "An overview of building a comprehensive AI development environment from hardware selection to operational excellence." \
    "2024-12-14" \
    '"ai-development", "series-overview", "development-environment", "architecture", "tooling"' \
    "/images/blog/ai-development-journey-overview.svg" \
    "8"

echo "All blog posts updated with frontmatter!"
echo "You can now test the blog posts in your dev server."
