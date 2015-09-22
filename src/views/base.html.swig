<!doctype html>

{% set project_title = "MarkdownDoc" %}

{# {% if name %}
  {% set project_title = (name || capitalize) %}
{% endif %} #}

{% if title %}
  {% set project_title = title %}
{% endif %}

<html lang="en">
<head>
  {# Include head content #}
  {% include "partials/head.html.swig" with project_title %}
</head>
<body>
  {# Include Sidebar menu #}
  <aside class="sidebar columns medium-4 large-3 xlarge-2" role="nav">
    {% include "partials/sidebar-menu.html.swig" %}
  </aside>

  {# Main container #}
  <main class="main columns medium-8 large-9 xlarge-10" role="main">

    {# Include top navbar #}
    {% include "partials/header.html.swig" with project_title %}

      {% block content %}{% endblock %}
    </article>

    {# Include footer #}
    {% include "partials/footer.html.swig" with project_title %}
  </main>


  {# Include scripts #}
  {% include "partials/scripts.html.swig" %}
</body>
</html>
