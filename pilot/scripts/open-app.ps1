# Design Flow - open trial app in browser
# Usage: double-click open-app.bat, or run .\open-app.ps1

$ErrorActionPreference = "SilentlyContinue"

Add-Type -AssemblyName System.Windows.Forms

$RepoRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$Port = 5180
$Url = "http://127.0.0.1:$Port/pilot/trial/"
$LogFile = Join-Path $RepoRoot ".design-flow-server.log"

function Test-AppServer {
    try {
        $res = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
        return ($res.StatusCode -ge 200 -and $res.StatusCode -lt 400)
    } catch {
        return $false
    }
}

function Start-AppServer {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
                [System.Environment]::GetEnvironmentVariable("Path", "User")

    if (Get-Command npx -ErrorAction SilentlyContinue) {
        $cmd = "Set-Location -LiteralPath '$RepoRoot'; npx --yes serve '$RepoRoot' -l $Port *>> '$LogFile'"
        Start-Process powershell -ArgumentList @(
            "-NoProfile", "-WindowStyle", "Hidden", "-Command", $cmd
        ) | Out-Null
        return $true
    }

    if (Get-Command python -ErrorAction SilentlyContinue) {
        $cmd = "Set-Location -LiteralPath '$RepoRoot'; python -m http.server $Port *>> '$LogFile'"
        Start-Process powershell -ArgumentList @(
            "-NoProfile", "-WindowStyle", "Hidden", "-Command", $cmd
        ) | Out-Null
        return $true
    }

    if (Get-Command py -ErrorAction SilentlyContinue) {
        $cmd = "Set-Location -LiteralPath '$RepoRoot'; py -m http.server $Port *>> '$LogFile'"
        Start-Process powershell -ArgumentList @(
            "-NoProfile", "-WindowStyle", "Hidden", "-Command", $cmd
        ) | Out-Null
        return $true
    }

    return $false
}

function Show-Message {
    param([string]$Text, [string]$Icon = "Information")
    $iconType = [System.Windows.Forms.MessageBoxIcon]::Information
    if ($Icon -eq "Warning") { $iconType = [System.Windows.Forms.MessageBoxIcon]::Warning }
    [void][System.Windows.Forms.MessageBox]::Show(
        $Text,
        "Design Flow",
        [System.Windows.Forms.MessageBoxButtons]::OK,
        $iconType
    )
}

if (-not (Test-AppServer)) {
    if (-not (Start-AppServer)) {
        $nl = [Environment]::NewLine
        $msg = "Local server could not start." + $nl + $nl
        $msg += "Install Node.js (npx) or Python, then try again." + $nl
        $msg += "Opening pilot/trial/index.html directly as fallback."
        Show-Message -Text $msg -Icon Warning
        Start-Process (Join-Path $RepoRoot "pilot\trial\index.html")
        exit 1
    }

    $ready = $false
    for ($i = 0; $i -lt 30; $i++) {
        Start-Sleep -Milliseconds 500
        if (Test-AppServer) {
            $ready = $true
            break
        }
    }

    if (-not $ready) {
        $nl = [Environment]::NewLine
        $msg = "Server is still starting." + $nl
        $msg += "Wait a moment and run open-app.bat again." + $nl + $nl
        $msg += "Log: .design-flow-server.log"
        Show-Message -Text $msg
        exit 1
    }
}

Start-Process $Url
exit 0
