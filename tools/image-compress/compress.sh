#!/bin/bash

# Image Compression Tool Runner
# This script installs required dependencies and runs the image compression tool

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}======================================${NC}"
echo -e "${YELLOW}       Image Compression Tool         ${NC}"
echo -e "${YELLOW}======================================${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is required but not installed.${NC}"
    echo "Please install Node.js and try again."
    exit 1
fi

# Change to the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Navigate to project root
cd ../../

# Check if required dependencies are installed
echo -e "\n${GREEN}Checking dependencies...${NC}"
if ! npm list sharp | grep -q sharp; then
    echo -e "${YELLOW}Installing sharp image processing library...${NC}"
    npm install sharp --save-dev
fi

if ! npm list glob | grep -q glob; then
    echo -e "${YELLOW}Installing glob library...${NC}"
    npm install glob --save-dev
fi

echo -e "\n${GREEN}Running image compression tool...${NC}"
node tools/image-compress/compress-images.js

echo -e "\n${GREEN}Done!${NC}"
echo -e "${YELLOW}======================================${NC}"
