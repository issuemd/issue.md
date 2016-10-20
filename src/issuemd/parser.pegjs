COLLECTION = ISSUE*

ISSUE = title:TITLE original:ISSUE_META DIVIDER body:BODY? updates:UPDATE* {
  original.title = title
  original.body = body || null
  return { original: original, updates: updates }
}

TITLE = '##' SPACE+ title:TO_EOL { return title }

/* reserve space for title, to retain order of attributes (mostly for testing purposes) */
ISSUE_META = created:META_CREATED creator:META_CREATOR meta:META_ITEM* {
  return {
    title: null,
    created: created,
    creator: creator,
    meta: meta
  }
}

UPDATE_META = modified:META_MODIFIED modifier:META_MODIFIER type:META_TYPE meta:META_ITEM* {
  return {
    modified: modified,
    modifier: modifier,
    type: type,
    meta: meta
  }
}

UPDATE = UPDATE_DELIMITER update:UPDATE_META DIVIDER body:BODY? {
  update.body = body || null
  return update
}

/* BODY - used in ISSUE and UPDATE */
BODY = first:NOT_DELIMITER_START content:NOT_DELIMITER* DIVIDER { return first + content.join('') }

/* DELIMITATION */
// could be delimited by another issue, but then parse errors get eaten by issue body
NOT_DELIMITER = !(DIVIDER (EOF / UPDATE_DELIMITER META_ITEM / TITLE META_ITEM)) char:. { return char }
NOT_DELIMITER_START = !(EOF / UPDATE_DELIMITER META_ITEM / TITLE META_ITEM) char:. { return char }
UPDATE_DELIMITER = '---'

/* META DEFINITIONS */

META_CREATED = META_START 'created' META_SEPARATOR value:TO_EOL { return value }
META_CREATOR = META_START 'creator' META_SEPARATOR value:TO_EOL { return value }
META_MODIFIED = META_START 'modified' META_SEPARATOR value:TO_EOL { return value }
META_MODIFIER = META_START 'modifier' META_SEPARATOR value:TO_EOL { return value }
META_TYPE = META_START 'type' META_SEPARATOR value:TO_EOL { return value }
META_ITEM = META_START label:META_LABEL META_SEPARATOR value:TO_EOL { return { key: label, value: value } }
META_START = NEWLINE '+' SPACE+
META_LABEL = start:[a-zA-Z] rest:[a-zA-Z0-9_-]* { return start + rest.join('') }
// Perhaps better to use SPACE instead of WHITESPACE here
META_SEPARATOR = ':' WHITESPACE

/* GENERAL TOKEN DEFINITIONS */

TO_EOL = value:NOT_NEWLINE* { return value.join('') }
NOT_NEWLINE = !NEWLINE char:. { return char }

DIVIDER = NEWLINE NEWLINE

NEWLINE =  '\r\n' / '\r' / '\n'
WHITESPACE = '\t' / SPACE
SPACE = ' '
EOF = !.
