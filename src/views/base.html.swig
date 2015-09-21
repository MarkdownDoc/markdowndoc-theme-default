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
  <aside class="sidebar" role="nav">
    {% include "partials/sidebar-menu.html.swig" %}
  </aside>

  {# Main container #}
  <main class="main" role="main">

    {# Include top navbar #}
    {% include "partials/header.html.swig" with project_title %}

    {% block content %}{% endblock %}

    {# Include footer #}
    {% include "partials/footer.html.swig" with project_title %}
  </main>


  {# Include scripts #}
  {% include "partials/scripts.html.swig" %}
</body>
</html>
