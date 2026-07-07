$ErrorActionPreference = "Stop"
$claude = "C:\Users\robin\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe"
$brief = Get-Content -Raw "C:\Users\robin\code-talent-redesign\CLAUDE_RAMP_BRIEF.md"
Set-Location "C:\Users\robin\code-talent-redesign"
& $claude --dangerously-skip-permissions --effort high -p $brief
