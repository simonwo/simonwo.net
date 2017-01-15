---
title: One-click backup in Windows 7/Vista
category: technical
excerpt: Some short info on using sdclt.exe, the backup utility introduced in Vista, and its command line parameters.
---

I’ve been looking for a way to automate (as much as possible) system backups on a Windows 7 machine, specifically using the in-built backup utility. Windows 7’s backup tool is by no means the best and it suffers somewhat when it comes to automation, but it does have the advantage of being built-in to Windows – in my opinion one should always make an effort to use the built-in solutions first before reaching out to third-party stuff.

Anyway, the backups were to be made on a USB portable hard drive and rather than setting a strict schedule a more on-demand approach was required, where the user could plug in the drive, hit a button and then wait for the back-up to complete as often (or not) as they desired. My initial search was for a zero-click solution: the backup drive is inserted and then the backup is started automatically. This has some UX issues (what if I want to restore files instead of backing up?) and while Windows Backup is pretty good at time-based scheduling, Task Scheduler doesn’t have events for things like inserting a USB drive. Solutions are definitely possible using PowerShell, they ain’t pretty and by my reckoning difficult to get stable in the face of things like changing drive letters.

To perform a manual back-up requires delving into Control Panel and then rooting around to find the manual back-up button – inconvenient at best and confusing for those not so technologically-minded. So, I eventually settled on trying to make manual back-up easier, ideally with just one click on a taskbar shortcut. Attention turns to `sdclt.exe`, the backup interface. One could just use `wbadmin` directly, but it makes sense to use sdclt.exe as it already has some handy command-line parameters to do exactly what we need. These are not officially documented anywhere (because apparently [customers don’t use the command line](http://social.technet.microsoft.com/Forums/zh/windowsbackup/thread/1eaa0163-f752-46cd-85df-bdc46b6755e6), derp) but the following is a definitely incomplete list (partly compiled from [here](http://www.simple-tech.info/windows-backup-sdcltexe-vistaseven-command-line-parametters.aspx)). Comments included are my own understanding of what this option does.

```
Options that control functionality directly:
/ENABLEJOB - Enable the automatic back-up job.
/DISABLEJOB - Disable the automatic back-up job.
/KICKOFFNEW - Start a full back-up.
/KICKOFFJOB - Start an incremental back-up.
/KICKOFFELEV - Start some kind of back-up, how it differs from above is unknown.
/RESTORE
/STOPBACKUP
/DETECTFAILURE
/CHECKFULL
/RUNONCE
/RESTOREPAGE
/BACKUPPAGE
/DELETECATALOGANDKICKOFFNEW
/CHECKSKIPPED
/FIRSTTIME
/RESTORE
/CLEARSTALE

Options that open windows or dialogs:
/RESTOREWIZARD - Wizard for restoring from a back-up.
/RESTOREWIZARDADMIN - Advanced(?) wizard for restoring from a back-up.
/BLBBACKUPWIZARD - Wizard for creating a new system image.
/UIMODE /SHOW - Show a dialog with progress of the current or most recent back-up.
/CONFIGURE - Open the backup settings window.
/CONFIGURE /TARGET - Open the backup location configuration window.
/TROUBLESHOOT - Open the 'Backup Troubleshooter' dialog.
/CONFIGNOTIFICATION - When run as a Scheduled Task, displays a reminder to configure backup.
/FOLDEROPTIONS
```

Additionally, if anyone has any further information about these then by all means let me know.

With this knowledge, the task at hand is pretty straightforward. Assuming that your back-up is setup correctly, simply running `sdclt.exe /KICKOFFJOB` will start your back-up job running. To get this on the taskbar, simply create a new shortcut on your desktop to the above command, and then drag it onto the taskbar. You will probably need to go into the shortcut properties and check “Run as Administrator”.

For bonus points you can also open a dialog to show progress, although this involves running two commands, and the easiest way is to invoke the Command Interpreter (cmd.exe) with the /c option. Using `cmd.exe /c “sdclt.exe /KICKOFFJOB && sdclt.exe /UIMODE /SHOW”` will do exactly that, and you can put that onto the taskbar using the same method as above. Suitable icons for making the shortcut pretty can be found in sdclt.exe itself.
