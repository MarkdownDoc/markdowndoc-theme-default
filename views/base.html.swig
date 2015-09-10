<!doctype html>

{% set project_title = "MarkdownDoc" %}

{% if package.name %}
  {% set project_title = (package.name|capitalize) %}
{% endif %}

{% if package.title %}
  {% set project_title = package.title %}
{% endif %}

<html lang="en">
<head>
  {# Include head content #}
  {% include "partials/head.html.swig" with project_title %}
</head>
<body>

  {# Main container #}
  <article class="main" role="main">

    {# Include top navbar #}
    {% include "/partials/header.html.swig" with project_title %}

    {# Include destription #}
    {% include "/partials/destription.html.swig" %}

    {% block content %}{% endblock %}

    {# Include footer #}
    {% include "/partials/footer.html.swig" with project_title %}
  </article>


  {# Include scripts #}
  {% include "/partials/scripts.html.swig" %}
</body>
</html>
