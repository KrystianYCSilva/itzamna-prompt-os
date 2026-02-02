#!/bin/bash

# Itzamna PromptOS - Helper Script
# Quick access to common commands

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI="$SCRIPT_DIR/core/cli.py"

case "$1" in
    "info")
        python3 "$CLI" info
        ;;
    "list")
        python3 "$CLI" list --type "${2:-all}"
        ;;
    "generate")
        if [ -z "$2" ]; then
            echo "Usage: ./promptos.sh generate <topic> [type] [domain]"
            echo "Example: ./promptos.sh generate 'Python Async' skill programming"
            exit 1
        fi
        TOPIC="$2"
        TYPE="${3:-skill}"
        DOMAIN="${4:-programming}"
        python3 "$CLI" generate --topic "$TOPIC" --type "$TYPE" --domain "$DOMAIN"
        ;;
    "workflow")
        if [ -z "$2" ]; then
            echo "Usage: ./promptos.sh workflow <topic> [type] [domain]"
            echo "Example: ./promptos.sh workflow 'Docker' skill programming"
            exit 1
        fi
        TOPIC="$2"
        TYPE="${3:-skill}"
        DOMAIN="${4:-programming}"
        python3 "$CLI" workflow --topic "$TOPIC" --type "$TYPE" --domain "$DOMAIN"
        ;;
    "research")
        if [ -z "$2" ]; then
            echo "Usage: ./promptos.sh research <topic> [domain]"
            echo "Example: ./promptos.sh research 'Kubernetes' technology"
            exit 1
        fi
        TOPIC="$2"
        DOMAIN="${3:-programming}"
        python3 "$CLI" research --topic "$TOPIC" --domain "$DOMAIN"
        ;;
    "help"|"-h"|"--help")
        echo "Itzamna PromptOS - Helper Script"
        echo ""
        echo "Usage: ./promptos.sh <command> [arguments]"
        echo ""
        echo "Commands:"
        echo "  info                    Show system information"
        echo "  list [type]             List generated content (all/skills/personas/prompts)"
        echo "  generate <topic> [type] [domain]"
        echo "                          Generate content for a topic"
        echo "  workflow <topic> [type] [domain]"
        echo "                          Run complete workflow (Research → Generate → Approve → Commit)"
        echo "  research <topic> [domain]"
        echo "                          Research a topic"
        echo "  help                    Show this help message"
        echo ""
        echo "Examples:"
        echo "  ./promptos.sh info"
        echo "  ./promptos.sh list skills"
        echo "  ./promptos.sh generate 'Python Async' skill programming"
        echo "  ./promptos.sh workflow 'React Hooks' skill"
        echo "  ./promptos.sh research 'GraphQL' technology"
        echo ""
        echo "For more information, see DOCUMENTATION.md"
        ;;
    *)
        echo "Unknown command: $1"
        echo "Run './promptos.sh help' for usage information"
        exit 1
        ;;
esac
