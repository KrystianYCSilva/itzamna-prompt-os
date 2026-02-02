#!/bin/bash

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║          Itzamna PromptOS - System Demonstration              ║"
echo "║     Auto-Evolutionary System for Human-Agent Programming       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "📋 Step 1: System Information"
echo "─────────────────────────────────────────────────────────────────"
./promptos.sh info
echo ""

echo "📚 Step 2: List Existing Content"
echo "─────────────────────────────────────────────────────────────────"
./promptos.sh list all
echo ""

echo "🔍 Step 3: Research a Topic"
echo "─────────────────────────────────────────────────────────────────"
python core/cli.py research --topic "Go Channels" --domain programming
echo ""

echo "⚙️  Step 4: Generate Content"
echo "─────────────────────────────────────────────────────────────────"
echo "Generating a skill about 'Go Channels'..."
python core/cli.py generate --topic "Go Channels" --type skill | head -50
echo ""
echo "[... content truncated for demo ...]"
echo ""

echo "✅ Demonstration Complete!"
echo ""
echo "Next steps:"
echo "  • Run: ./promptos.sh workflow 'Your Topic' skill"
echo "  • Read: QUICKSTART.md for getting started"
echo "  • Check: EXAMPLES.md for more usage examples"
echo "  • Explore: DOCUMENTATION.md for full documentation"
echo ""
echo "═══════════════════════════════════════════════════════════════════"
