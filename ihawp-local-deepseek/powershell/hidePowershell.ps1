# Define the ShowWindow function from user32.dll
Add-Type @"
using System;
using System.Runtime.InteropServices;

public class Win32ShowWindow {
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@

$processes = Get-Process -Name "powershell";

foreach ($process in $processes) {
    $hwnd = $process.MainWindowHandle

    if ($hwnd -ne 0) {
        [Win32ShowWindow]::ShowWindow([IntPtr]$hwnd, 2)
    }
}
