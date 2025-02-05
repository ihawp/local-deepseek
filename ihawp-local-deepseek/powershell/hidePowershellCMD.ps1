# Define the ShowWindow function from user32.dll
Add-Type @"
using System;
using System.Runtime.InteropServices;

public class Win32ShowWindow {
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@

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

Pause