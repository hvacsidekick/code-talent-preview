$brief = Get-Content -Raw "CLAUDE_GLOWY_HERO_BRIEF.md"
$claude = "C:\Users\robin\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe"
& $claude --dangerously-skip-permissions --effort high -p $brief *> worker-glowy-hero.log
