# Get all Ollama related processes
$wow = Get-Process | Where-Object { $_.ProcessName -like '*ollama*' } | Select-Object Id

# Check if any processes were found, taskkill any that were
if ($wow.Count -ne 0) {
    foreach ($wo in $wow) {
        taskkill /F /PID $wo.id
    }
}

# Serve Ollama
ollama serve
