Here the list of Palera1n Commands:
## Rootful
`palera1n -f`
The `-f` argument indicates a rootful command
- `palera1n -f -c` creates FakeFS (The container for jailbreak files and tweaks)
- `palera1n -f -B` creates BindFS (A smaller FakeFS)
- `palera1n -f` boots to FakeFS or BindFS (have to run this after creating FakeFS or BindFS)
- `palera1n -f --force-revert` deletes FakeFS or BindFS
## Rootless
`palera1n -l`
The `l` argument indicates a rootless command
- `palera1n -l` boots rootless
- `palera1n -l --force-revert` deletes jailbreak and tweaks
## Other Commands
- `palera1n -n` exit from recovery mode
- `palera1n -E` boot in recovery mode
- `palera1n -D` exit from DFU mode
- `palera1n -s` enter safe mode (this doesn't load tweaks)
- `palera1n -I` connected device info
## What jailbreak I have to choose
**Rootless** is the best choise because is modern and it has more support than rootful
