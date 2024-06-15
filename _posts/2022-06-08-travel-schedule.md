---
title: Digital nomad travel schedule
category: stuff
excerpt: Celia and I have become digital nomads. This is where we’ll be.
featured: yes
big: yes
---

Celia and I have become digital nomads. This is where we’ll be.

Blanks mean we’re homeless! You can get an auto-updating iCalender version [here](/nomads.ical).

<style type="text/css">
table tr.past { display: none }
#show_past:checked ~ table tr.past { display: table-row }
</style>

<div>
<input id="show_past" type="checkbox">
<label for="show_past">Show past locations</label>

<table>
  <thead>
    <tr><th>#</th><th>Start date</th><th>End date</th><th>Location</th><th>Days</th></tr>
  </thead>
  <tbody>
    {% for destination in site.data.nomads %}
    {% assign now = "now" | date: "%s" %}
    {% assign start = destination.start | date: "%s" %}
    {% assign end = destination.end | date: "%s" %}
    {% assign days = end | minus: start | divided_by: 86400 %}
    <tr{% if now > end %} class="past"{% endif %}>
      <td>{{ forloop.index }}</td>
      <td>{{ destination.start | date: "%A %e %B" }}</td>
      <td>{{ destination.end | date: "%A %e %B" }}</td>
      <td>{{ destination.location }}</td>
      <td>{{ days }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
</div>
