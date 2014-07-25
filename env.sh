#!/not/executable/bash
if ! echo "$PATH" | egrep -q "(^|:)node_modules/.bin/?(:|$)"; then
    export PATH=node_modules/.bin:$PATH
fi
