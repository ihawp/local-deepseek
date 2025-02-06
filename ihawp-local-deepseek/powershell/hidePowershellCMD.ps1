# Get all PowerShell processes
$processes = Get-Process -Name "powershell";

foreach ($process in $processes) {
    # Get the main window handle
    $hwnd = $process.MainWindowHandle

    # Check if the handle is valid
    if ($hwnd -ne 0) {
        # Minimize the window
        [Win32ShowWindow]::ShowWindow([IntPtr]$hwnd, 2) # 2 is SW_MINIMIZE
    }
}
