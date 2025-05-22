#!/bin/bash

# Script to publish AI Development Journey blog series
# Moves files from ai-development-journey subdirectory to main blog directory
# and adds proper Astro frontmatter

set -e

BLOG_DIR="~/Workspace/dk-portfolio-windsurf/src/content/blog"
SOURCE_DIR="$BLOG_DIR/ai-development-journey"
TARGET_DIR="$BLOG_DIR"

echo "Publishing AI Development Journey blog series..."

# Array of files to process with their metadata
declare -A posts
posts=(
    ["01-hardware-foundation.md"]="The Hardware Foundation for AI Development|How the right hardware choices enabled a sophisticated AI development environment with M4 Mac Mini, 64GB RAM, and strategic storage decisions.|