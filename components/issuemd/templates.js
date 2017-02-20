'use strict'

export var htmlTemplate = `{{#data}}
<div class="issue">{{#original}}
  <div class="original">
    <div class="head">
      <h2>{{{title}}}</h2>
      <ul class="original-attr">
        <li><b class="key">created<span class="meta-divider">: </b><span class='value' title='{{created}}'>{{#util.date}}{{created}}{{/util.date}}</span></li>
        <li><b class="key">creator<span class="meta-divider">: </b><span class='value'>{{{creator}}}</span></li>{{#meta}}
        <li><b class="key">{{key}}<span class="meta-divider">: </b><span class='value'>{{{value}}}</span></li>{{/meta}}
      </ul>
    </div>
    <div class="body">
{{{body}}}    </div>
  </div>{{/original}}
  <div class="updates">{{#updates}}
    <hr class="update-divider">
    <div class="update">
      <ul class="update-attr">
        <li><b class="key">modified<span class="meta-divider">: </b><span class='value' title='{{modified}}'>{{#util.date}}{{modified}}{{/util.date}}</span></li>
        <li><b class="key">modifier<span class="meta-divider">: </b><span class='value'>{{{modifier}}}</span></li>
        <li><b>type:</b> {{type}}</li>{{#meta}}
        <li><b>{{key}}:</b> {{{value}}}</li>{{/meta}}
      </ul>
      <div class="update-body">
{{{body}}}      </div>
    </div>{{/updates}}
  </div>
</div>
{{/data}}`

export var mdTemplate = `{{! use triple '{'s for title/value/body to retain special characters }}
{{#.}}{{#original}}
## {{{title}}}
+ created: {{created}}
+ creator: {{{creator}}}
{{#meta}}
+ {{key}}: {{{value}}}
{{/meta}}

{{#body}}
{{{body}}}

{{/body}}{{/original}}
{{#updates}}
---
+ modified: {{modified}}
+ modifier: {{{modifier}}}
+ type: {{type}}
{{#meta}}
+ {{key}}: {{{value}}}
{{/meta}}

{{#body}}
{{{body}}}

{{/body}}{{/updates}}
{{/.}}`

// TODO: figure out how to have one instead of two blank lines for empty body
export var issueSummaryTemplate = `{{#data}}
{{#util.hsep}}+-{{#util.pad}}-{{/util.pad}}-+{{/util.hsep}}
{{#title}}
{{#util.hsep}}| {{/util.hsep}}{{#util.htext}}{{#util.body}}{{{.}}}{{/util.body}}{{/util.htext}}{{#util.hsep}} |{{/util.hsep}}
{{/title}}
{{#util.hsep}}+-{{#util.padleft}}-{{/util.padleft}}-+-{{#util.padright}}-{{/util.padright}}-+{{/util.hsep}}
{{#util.bsep}}| {{/util.bsep}}{{#util.bkey}}{{#util.key}}signature{{/util.key }}{{/util.bkey}}{{#util.bsep}} | {{/util.bsep}}{{#util.btext}}{{#util.value}}{{{creator}}} @ {{{created}}}{{/util.value }}{{/util.btext}}{{#util.bsep}} |{{/util.bsep}}
{{#meta}}
{{#util.bsep}}| {{/util.bsep}}{{#util.bkey}}{{#util.key}}{{{key}}}{{/util.key}}{{/util.bkey}}{{#util.bsep}} | {{/util.bsep}}{{#util.btext}}{{#util.value}}{{{value}}}{{/util.value}}{{/util.btext}}{{#util.bsep}} |{{/util.bsep}}
{{/meta}}
{{#util.bsep}}| {{#util.pad}} {{/util.pad                                                                                                     }} |{{/util.bsep}}
{{#body}}
{{#util.bsep}}| {{/util.bsep}}{{#util.btext}}{{#util.body}}{{{.}}}{{/util.body}}{{/util.btext}}{{#util.bsep}} |{{/util.bsep}}
{{/body}}
{{#comments}}
{{#util.bsep}}| {{#util.pad}} {{/util.pad}} |{{/util.bsep}}
{{#util.bsep}}+-{{#util.padleft}}-{{/util.padleft}}-+-{{#util.padright}}-{{/util.padright}}-+{{/util.bsep}}
{{#util.bsep}}| {{/util.bsep}}{{#util.bkey}}{{#util.key}}{{type}}{{/util.key }}{{/util.bkey}}{{#util.bsep}} | {{/util.bsep}}{{#util.btext}}{{#util.value}}{{{modifier}}} @ {{{modified}}}{{/util.value}}{{/util.btext}}{{#util.bsep}} |{{/util.bsep}}
{{#meta}}
{{#util.bsep}}| {{/util.bsep}}{{#util.bkey}}{{#util.key}}{{{key}}}{{/util.key}}{{/util.bkey}}{{#util.bsep}} | {{/util.bsep}}{{#util.btext}}{{#util.value}}{{{value}}}{{/util.value}}{{/util.btext}}{{#util.bsep}} |{{/util.bsep}}
{{/meta}}
{{#util.bsep}}| {{#util.pad}} {{/util.pad}} |{{/util.bsep}}
{{#body}}
{{#util.bsep}}| {{/util.bsep}}{{#util.btext}}{{#util.body}}{{{.}}}{{/util.body}}{{/util.btext}}{{#util.bsep}} |{{/util.bsep}}
{{/body}}
{{/comments}}
{{#util.bsep}}+-{{#util.pad}}-{{/util.pad}}-+{{/util.bsep}}
{{/data}}`

export var collectionSummaryTemplate = `{{#util.hsep}}+-{{#util.pad}}-{{/util.pad}}-+{{/util.hsep}}
{{#util.hsep}}| {{/util.hsep}}{{#util.htext}}{{#util.body}}ID     Assignee     Status       Title{{/util.body}}{{/util.htext}}{{#util.hsep}} |{{/util.hsep}}
{{#util.hsep}}+-{{#util.pad}}-{{/util.pad}}-+{{/util.hsep}}
{{#data}}
{{#util.bsep}}| {{/util.bsep}}{{#util.btext}}{{#util.curtailed}}{{#util.body}}{{#util.pad6}}{{{id}}}{{/util.pad6}} {{#util.pad12}}{{{assignee}}}{{/util.pad12}} {{#util.pad12}}{{{status}}}{{/util.pad12}} {{{title}}}{{/util.body}}{{/util.curtailed}}{{/util.btext}}{{#util.bsep}} |{{/util.bsep}}
{{/data}}
{{#util.bsep}}+-{{#util.pad}}-{{/util.pad}}-+{{/util.bsep}}`
