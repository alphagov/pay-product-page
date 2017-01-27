# logging stream (file descriptor 3) defaults to STDERR
exec 3>&2

# default to show warnings
verbosity=4
silent_lvl=0
crt_lvl=1
err_lvl=2
wrn_lvl=3
inf_lvl=4
dbg_lvl=5

# Padding
padding ()
{
    s="$1"
    while [ ${#s} -lt 13 ]; do
        s=$s' '
    done
    printf "$s\n"
}

# Always prints
notify ()
{
    log $silent_lvl "\033[33;34m$(padding $1) |\033[0m [NOTE] $2";
} 

critical ()
{
    log $crt_lvl "\033[33;34m$(padding $1) |\033[0m \033[33;31m[CRITICAL]\033[0m $2";
}

error ()
{
    log $err_lvl "\033[33;34m$(padding $1) |\033[0m \033[33;31m[ERROR]\033[0m $2";
}

warn ()
{
    log $wrn_lvl "\033[33;34m$(padding $1) |\033[0m \033[33;31m[WARNING]\033[0m $2";
}

debug ()
{
    log $dbg_lvl "\033[33;34m$(padding $1) |\033[0m [DEBUG] $2";
}

# "info" is already a command
inf ()
{
    log $inf_lvl "\033[33;34m$(padding $1) |\033[0m \033[33;32m[INFO]\033[0m $2";
} 

log ()
{
    if [ $verbosity -ge $1 ]; then
        # Expand escaped characters, wrap at 70 chars, indent wrapped lines
        printf "$2\n" >&3
    fi
}
