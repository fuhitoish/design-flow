Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
root = fso.GetParentFolderName(WScript.ScriptFullName)
shell.CurrentDirectory = root
shell.Run "powershell -NoProfile -ExecutionPolicy Bypass -Sta -WindowStyle Hidden -File """ & root & "\open-app.ps1""", 0, False
