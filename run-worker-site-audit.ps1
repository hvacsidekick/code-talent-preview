$ErrorActionPreference = "Stop"
$claude = "C:\Users\robin\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin\claude.exe"
$brief = Get-Content -Raw "C:\Users\robin\code-talent-redesign\CLAUDE_SITE_AUDIT_BRIEF.md"
& $claude --permission-mode bypassPermissions -p $brief
